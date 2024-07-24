import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    List,
    ListItem,
    TextField,
    Typography,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import Base from "../../Layouts/Base";

// ChatItem component for individual chat messages
const ChatItem = ({ chat }) => (
    <Card variant="outlined" sx={{ mb: 1 }}>
        <CardContent>
            <Typography variant="h6">User: {chat.prompt}</Typography>
            <Typography>
                <strong>Financial aid bot:</strong>
            </Typography>
            <Typography>{chat.result}</Typography>
        </CardContent>
    </Card>
);

// ChatGroup component for displaying a group of chats
const ChatGroup = ({ chatGroup, isActive, onClick, onDelete }) => (
    <div style={{ margin : '5px'}}>
            <Button
                variant={isActive ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => onClick(chatGroup.id)}
                sx={{ flexGrow: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {chatGroup.name}
            </Button>
    </div>
);

export default function Index({ chatGroups }) {
    const [activeChatGroupId, setActiveChatGroupId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (chatGroups.length > 0 && activeChatGroupId === null) {
            setActiveChatGroupId(chatGroups[0].id);
        }
    }, [chatGroups]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendPrompt = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = { chat_group_id: activeChatGroupId, chat_prompt: inputValue };

        Inertia.post('/chat/add-chat', data, {
            onSuccess: () => {
                setInputValue('');
                setLoading(false);
            },
            onError: (err) => {
                console.log('err', err)
                setLoading(false);
            },
        });
    };

    const handleStartNewChat = () => {
        Inertia.post('/chat/create', { name: `Chat Group ${chatGroups.length + 1}` }, {
            onSuccess: (response) => {
                setActiveChatGroupId(response.props.id);
            }
        });
    };

    const handleChatGroupClick = (id) => {
        setActiveChatGroupId(id);
    };

    const handleDeleteChatGroup = (e, id) => {
        e.stopPropagation();
        Inertia.delete(`/chat/${id}`, {
            onSuccess: () => {
                if (activeChatGroupId === id) {
                    setActiveChatGroupId(chatGroups.length > 0 ? chatGroups[0].id : null);
                }
            }
        });
    };

    const activeChatGroup = chatGroups.find((group) => group.id === activeChatGroupId);

    return (
        <Container>
            <Card sx={{ padding: 2 }}>
                <Box display="flex" flexDirection="column" height="100vh">
                    {chatGroups.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                            <Button variant="contained" color="primary" onClick={handleStartNewChat}>
                                Start a Chat Now!
                            </Button>
                        </Box>
                    ) : (
                        <Box display="flex" flexGrow={1} gap={2}>
                            <Box flex={1} borderRight="1px solid #ccc" overflow="auto" p={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleStartNewChat}
                                    sx={{ mb: 2 }}
                                >
                                    Add New Chat
                                </Button>
                                {chatGroups.map((chatGroup) => (
                                    <ChatGroup
                                        key={chatGroup.id}
                                        chatGroup={chatGroup}
                                        isActive={chatGroup.id === activeChatGroupId}
                                        onClick={handleChatGroupClick}
                                        onDelete={handleDeleteChatGroup}
                                    />
                                ))}
                            </Box>
                            <Box flex={2} overflow="auto" p={2}>
                                {activeChatGroup && (
                                    <List>
                                        {activeChatGroup.chats.map((chat) => (
                                            <ChatItem key={chat.id} chat={chat} />
                                        ))}
                                    </List>
                                )}
                            </Box>
                        </Box>
                    )}
                    <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type your prompt"
                            disabled={loading}
                            sx={{ mr: 1 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendPrompt}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Send'}
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
}

Index.layout = (page) => <Base key={page} children={page} title={"Financial Aid Bot"}/>
