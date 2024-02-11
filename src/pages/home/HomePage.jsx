import React, {useRef} from 'react';
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import { Avatar, Box, Button, FormControl, TextField, InputLabel, Select, MenuItem, Typography, Tab, Tabs, List, ListItem, IconButton, Switch, FormGroup, FormControlLabel, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import logo from './Quanta.svg'
import { Link } from 'react-router-dom';

// Dark theme configuration
const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#424242',
            default: '#303030',
        },
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#ce93d8',
        },
    },
});

const MessageLog = styled(Box)(({ theme }) => ({

    backgroundColor: '#808080', // Grey background color
    border: '0px solid #000000', // Tiny black borders
    borderRadius: '4px', // Rounded corners for aesthetics
    flexGrow: 1, // Allow the message log to expand to fill the available space
    padding: theme.spacing(2), // Add padding for better appearance
    position: 'relative', // Position relative to contain the absolute-positioned white box
    height: '100%', // Fill the available height within the ChatSection
    overflowY: 'auto', // Enable vertical scrolling
    maxHeight: '65%', // Limit the maximum height to the height of the ChatSection

}));


const WhiteBox = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    opacity: 0.3, // Adjust the opacity as needed
    zIndex: 1, // Ensure it's on top of the message log content
});

// Custom styled components adapted for dark mode
const CustomFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(2),
    minWidth: 240,
    '& .MuiInputLabel-root': { color: '#fff' }, // Label color
    '& .MuiInputBase-root': { color: '#fff' }, // Input text color
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#90caf9' }, // Border color
}));

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#90caf9',
    color: '#000',
    '&:hover': {
        backgroundColor: '#ce93d8', // Hover color
    },
    width: '100%',
}));

// Adjusted PageContainer for dark mode
const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row', // Ensure layout is horizontal
    height: '100vh', // Full viewport height
    backgroundColor: theme.palette.background.default,
}));


const RightContainer = styled(Box)(({ theme }) => ({
    // Ensure this container doesn't exceed the viewport height
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    height: 'calc(100vh - 64px)', // Adjust based on your AppBar height or any fixed header you might have
    gap: theme.spacing(2),
}));

const ProfileSection = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '10%',
    marginTop: '20px', // Corrected syntax
});


const FormSection = styled(Box)({
    transform: 'translateX(-20px)', // Adjust the pixel value as needed to move to the left
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '30%',
});

const ChatSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    flexShrink: 1, // Allow shrinking

    flexBasis: '50%', // Suggest an initial height, but adjust based on your layout
    minHeight: '200px', // Minimum height
    padding: theme.spacing(2)
}));

const UploadSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    flexShrink: 1, // Allow shrinking
    flexBasis: '50%', // Suggest an initial height
    minHeight: '200px', // Minimum height
    padding: theme.spacing(2),
    overflowY: 'auto', // Enable vertical scrolling
}));

const CustomTabs = styled(Tabs)({
    marginBottom: '16px',
    '& .MuiTabs-indicator': {
        backgroundColor: '#fff',
    },
});

const Separator = styled(Box)(({ theme }) => ({
    height: '0px', // Set height to 0
    width: '100%',
    backgroundColor: 'transparent', // Make it transparent
}));

const LogoImage = styled('img')({
    position: 'fixed',
    bottom: '10px',
    left: '15px',
    width: '100px',
    height: 'auto',
});

export default function NewPage() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [speakerId, setSpeakerId] = useState('');
    const [activeTab, setActiveTab] = useState(0);

    // const [messageFilter, setMessageFilter] = useState('allMessages');
    const messageFilter = useRef('allMessages');
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);

    const [server, setServer] = useState('');
    const [servers, setServers] = useState([]);
    const [channels , setChannels] = useState([]);
    const [channel, setChannel] = useState('');
    const token = useRef('')

    const [userName, setUserName] = useState('')
    const [userPhoto, setUserPhoto] = useState('')
    // const [cachedMessages, setCachedMessages] = useState({test: "test"})
    const cachedMessages = useRef({})

    const [messages, setMessages] = useState([]);

    const [tempUserList, setTempUserList] = useState([''])

    const [ defaultVoice, setDefaultVoice] = useState(1)


    useEffect(() => {
        token.current = localStorage.getItem("token");

        // console.log('Token:', token)

        console.log("Fetch happened at get users")
        // console.log("Token is: ", token)

        // Fetch guilds with the token
        fetch('http://127.0.0.1:5000/get_user_servers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.current }),
        })
            .then(response => response.json())
            .then(data => {
                const guilds = Object.entries(data).map(([id, [name, icon]]) => ({ id, name, icon }));
                setServers(guilds);
            })
            .catch(error => console.error('Error fetching guilds:', error));
    }, []);


    useEffect(()=> {

        console.log("Server changed")

        //Fetching channels
        fetch('http://127.0.0.1:5000/get_server_channels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guildID: server, token: token.current })
        }).then(
            response => response.json()
        )
        .then(data => {
            // Map channels and names
            const channels = Object.entries(data).map(([id, name]) => ({ id, name }));
            setChannels(channels);
            setChannel(channels[0].id);
        }
        )
    }, [server])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get-my-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.current }),
        })
            .then(response => response.json())
            .then(data => {
                setUserName(data.username)
                setUserPhoto(data.avatar)
            })
            .catch(error => console.error('Error fetching user-info:', error));
    }, [])


    const handleServerChange = (event) => {
        // console.log(event.target.value)?
        setServer(event.target.value);
        setChannel('');
    };


    const handleFileChange = (event) => {
        const newFiles = event.target.files;
        const updatedFiles = [...selectedFiles, ...Array.from(newFiles)].slice(0, 1);
        setSelectedFiles(updatedFiles);
    };

    const handleSpeakerIdChange = (event) => {
        setSpeakerId(event.target.value);
    }

    const handleRemoveFile = (index) => {
        // Remove the file at the given index (might need to add some server logic to remove from elevenlabs)
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    const postFiles = (event) => {
        event.preventDefault();
        if (selectedFiles.length > 3) {
            return;
        }
        const formData = new FormData();
        formData.set("speaker_id", speakerId);
        for (let file in selectedFiles) {
            formData.append('file[]', selectedFiles[file]);
        }

        fetch("http://127.0.0.1:5000/add-voice", { body: formData, method: "POST" })
            .then((res) => res.json()).then(console.log);
    };

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleMessageFilterChange = (event) => {
        console.log(event.target.value);
        messageFilter.current = event.target.value;
        // setMessageFilter(event.target.value);
    };

    const handleFilterEnabledChange = (event) => {
        if (channel === '' || server === '') {
            console.log('Please select a server and channel before enabling the message filter.')
            alert('Please select a server and channel before enabling the message filter.');
            setIsFilterEnabled(false);
            return;
        }
        setIsFilterEnabled(event.target.checked);
    };

    const handleDefaultVoiceChange = (event) => {
        // console.log(event.target.value);
        setDefaultVoice(event.target.value);

    }



    useEffect(() => {
        let isActive = true; // Flag to control the loop based on the component's lifecycle

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const fetchData = async () => {
            while (isFilterEnabled && isActive) {
                console.log("Fetching data");

                try {
                    const response = await fetch('http://127.0.0.1:5000/scrape_for_new_messages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: token.current, channel_id: channel, friend_ids: ["1097538072482160641"], cached_messages: cachedMessages.current, defaultVoice: defaultVoice, messagesAllowed: messageFilter.current}),
                    });

                    const data = await response.json();
                    cachedMessages.current = data.cache;
                    const newMessages = data.messages;

                    setMessages(prevMessages => [...prevMessages, ...newMessages.map(msg => ({ content: msg }))]);

                    console.log(`New messages: ${newMessages}`);
                    data.audios.forEach((message) => {
                        console.log('data:audio/mpeg;base64,' + message);
                        const audio = new Audio(`data:audio/mpeg;base64,${message}`);
                        audio.play();
                    });
                } catch (error) {
                    console.error('Error fetching guilds:', error);
                }

                await delay(1000); // Wait for 1 second before the next fetch
            }
        };

        fetchData().then(r => console.log('Fetching data'));

        return () => {
            isActive = false; // Prevent the loop from continuing when the component unmounts
        };
    }, [isFilterEnabled]); // Dependency array to re-run useEffect if isFilterEnabled changes


    const handleChannelChange = (event) => {
        fetch('http://127.0.0.1:5000/get-users-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.current, channel: event.target.value, guild: server})
        })
            .then(response => response.json())
            .then(data => {
                console.log("Data.users: ", data.members)
                setTempUserList(data.members);
            })
            .catch(error => console.error('Error fetching user-info:', error));
        setChannel(event.target.value);

    };

    // Need to implement a function that handles file deletes that are in the server

    //


    return (
        <ThemeProvider theme={theme}>
        <PageContainer>
        <LogoImage src={logo} alt="Logo" />
            <ProfileSection>
                <Link href={userPhoto} underline="none">
                    <Avatar
                        sx={{ width: 56, height: 56, marginBottom: 2 }}
                        src={userPhoto}
                        alt="Profile Picture" />
                </Link>
                <Typography variant="h6">{userName}</Typography>
            </ProfileSection>
            <FormSection>
                <CustomFormControl>
                    <InputLabel>Server</InputLabel>
                    <Select
                        label="Server"
                        value={server}
                        onChange={handleServerChange}
                    >
                        {servers.map((guild) => (
                            <MenuItem key={guild.id} value={guild.id}>{guild.name}</MenuItem>
                        ))}
                    </Select>
                </CustomFormControl>
                    <CustomFormControl>
                        <InputLabel>Channel</InputLabel>
                        <Select
                            label="Channel"
                            // We have to set these up
                            value={channel} // Use state variable
                            onChange={handleChannelChange} // Use handler
                            disabled={!server}
                        >
                            {channels.map((channel) => (
                                <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
                            ))}
                        </Select>
                    </CustomFormControl>
                    <CustomFormControl>
                        {/*<InputLabel>Target Friend</InputLabel>*/}
                        {/*<Select*/}
                        {/*    label="Friend"*/}
                        {/*    // We have to set these up*/}
                        {/*    // value={channel} // Use state variable*/}
                        {/*    // onChange={handleChannelChange} // Use handler*/}
                        {/*>*/}
                        {/*    /!* We set a map to add the items *!/*/}
                        {/*    <MenuItem value={1}>Friend 1</MenuItem>*/}
                        {/*    <MenuItem value={2}>Friend 2</MenuItem>*/}
                        {/*</Select>*/}
                    </CustomFormControl>
                    <CustomFormControl>
                        <InputLabel>Default Voice</InputLabel>
                        <Select
                            label="Default Voice"
                            // We have to set these up
                            value={defaultVoice} // Use state variable
                            onChange={handleDefaultVoiceChange} // Use handler
                        >
                            {/* We set a map to add the items */}
                            <MenuItem value={1}>Voice 1</MenuItem>
                            <MenuItem value={2}>Voice 2</MenuItem>
                        </Select>
                    </CustomFormControl>
                <CustomButton>Update</CustomButton>
                <CustomFormControl>
                    <InputLabel id="message-filter-label">Message Filter</InputLabel>
                    <Select
                        labelId="message-filter-label"
                        value={messageFilter.current}
                        label="Message Filter"
                        onChange={handleMessageFilterChange}
                        disabled={!isFilterEnabled}
                    >
                        <MenuItem value="allMessages">All Messages</MenuItem>
                        <MenuItem value="usersOnly">Added Users Only</MenuItem>
                    </Select>
                </CustomFormControl>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={isFilterEnabled} onChange={handleFilterEnabledChange} />}
                        label={<Typography style={{ color: '#fff' }}>{isFilterEnabled ? "On" : "Off"}</Typography>}
                    />
                </FormGroup>
            </FormSection>
            <RightContainer>
            <ChatSection>
            <CustomTabs value={0} aria-label="chat tabs">
                <Tab label="Chat Logs" />
            </CustomTabs>
            <MessageLog>

                {messages.map((message, index) => (
                    <Box key={index} sx={{
                        backgroundColor: '#f0f0f0', // Light grey background for each message
                        margin: '8px 0', // Add some margin between messages
                        padding: '8px', // Add padding inside each message
                        borderRadius: '4px', // Rounded corners for each message
                    }}>
                        {message.content}
                    </Box>
                ))}
            </MessageLog>
             {/*We populate this with discord */}
            </ChatSection>
            <Separator />
                <UploadSection>
                    <CustomTabs value={activeTab} onChange={handleChangeTab} aria-label="upload tabs">
                        <Tab label="Upload" />
                        <Tab label="Options" />
                    </CustomTabs>
                    {activeTab === 0 && (
                        <Box>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={tempUserList}
                                onChange = {(event, value) => {
                                    console.log(value);
                                    setSpeakerId(value.id);
                                }}
                                getOptionLabel={(option) => option.username} // Use the username as the label for each option
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        <Avatar src={option.avatar} sx={{ width: 24, height: 24, marginRight: 2 }} />
                                        {option.username}
                                    </Box>
                                )}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Friend ID" />}
                            />
                            <form onSubmit={postFiles}>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ marginBottom: '16px', color: '#fff'  }}
                                    accept="audio/*"
                                    name='files[]' />
                                <List>
                                    {selectedFiles.map((file, index) => (
                                        <ListItem
                                        key={index}
                                        sx={{
                                            border: '1px solid #303030', // Add a border around the list item
                                            borderRadius: '4px', // Add border radius for aesthetics
                                            marginBottom: '8px', // Add some bottom margin for spacing
                                            color: '#fff', // Set text color to white
                                            padding: '8px', // Add padding inside the list item
                                        }}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                                                <CloseIcon />
                                            </IconButton>
                                        }
                                    >
                                        {file.name}
                                    </ListItem>

                                    ))}
                                </List>
                                <Button type="submit">
                                        Upload
                                </Button>
                            </form>
                        </Box>
                    )}
                {activeTab === 1 && (
                    <Box>
                        <Typography>If we add some options or anything extra</Typography>
                    </Box>
                )}
            </UploadSection>
            </RightContainer>
        </PageContainer>
        </ThemeProvider>
    );
}

