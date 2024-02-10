import React from 'react';
import { styled, createTheme, ThemeProvider} from '@mui/material/styles';
import { Avatar, Box, Button, FormControl, InputLabel, Select, MenuItem, Typography, Tab, Tabs, List, ListItem, IconButton, Switch, FormGroup, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

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
    width: '30%',
});

const FormSection = styled(Box)({
    transform: 'translateX(-80px)', // Adjust the pixel value as needed to move to the left
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
    padding: theme.spacing(2),
    overflowY: 'auto', // Enable vertical scrolling
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

export default function NewPage() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const [messageFilter, setMessageFilter] = useState('allMessages');
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);

    const handleFileChange = (event) => {
        const newFiles = event.target.files;
        const updatedFiles = [...selectedFiles, ...Array.from(newFiles)].slice(0, 3);
        setSelectedFiles(updatedFiles);
    };

    const handleRemoveFile = (index) => {
        // Remove the file at the given index (might need to add some server logic to remove from elevenlabs)
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleMessageFilterChange = (event) => {
        setMessageFilter(event.target.value);
    };

    const handleFilterEnabledChange = (event) => {
        setIsFilterEnabled(event.target.checked);
    };

    // Need to implement a function that handles file deletes that are in the server

    //


    return (
        <ThemeProvider theme={theme}>
        <PageContainer>
            <ProfileSection>
                <Avatar sx={{ width: 56, height: 56, marginBottom: 2 }}>U</Avatar>
                <Typography variant="h6">userID</Typography>
            </ProfileSection>
            <FormSection>
                    <CustomFormControl>
                        <InputLabel>Server</InputLabel>
                        <Select
                            label="Server"
                            // We have to set these up
                            // value={server} // Use state variable
                            // onChange={handleServerChange} // Use handler
                        >
                            {/* We set a map to add the items */}
                            <MenuItem value={1}>Server 1</MenuItem>
                            <MenuItem value={2}>Server 2</MenuItem>
                        </Select>
                    </CustomFormControl>
                    <CustomFormControl>
                        <InputLabel>Channel</InputLabel>
                        <Select
                            label="Channel"
                            // We have to set these up
                            // value={channel} // Use state variable
                            // onChange={handleChannelChange} // Use handler
                        >
                            {/* We set a map to add the items */}
                            <MenuItem value={1}>Channel 1</MenuItem>
                            <MenuItem value={2}>Channel 2</MenuItem>
                        </Select>
                    </CustomFormControl>
                    <CustomFormControl>
                        <InputLabel>Target Friend</InputLabel>
                        <Select
                            label="Friend"
                            // We have to set these up
                            // value={channel} // Use state variable
                            // onChange={handleChannelChange} // Use handler
                        >
                            {/* We set a map to add the items */}
                            <MenuItem value={1}>Friend 1</MenuItem>
                            <MenuItem value={2}>Friend 2</MenuItem>
                        </Select>
                    </CustomFormControl>
                    <CustomFormControl>
                        <InputLabel>Default Voice</InputLabel>
                        <Select
                            label="Default Voice"
                            // We have to set these up
                            // value={defaultVoice} // Use state variable
                            // onChange={handleDefaultVoiceChange} // Use handler
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
                        value={messageFilter}
                        label="Message Filter"
                        onChange={handleMessageFilterChange}
                        disabled={!isFilterEnabled}
                    >
                        <MenuItem value="allMessages">All Messages</MenuItem>
                        <MenuItem value="addedUsersOnly">Added Users Only</MenuItem>
                    </Select>
                </CustomFormControl>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={isFilterEnabled} onChange={handleFilterEnabledChange} />}
                        label={isFilterEnabled ? "On" : "Off"}
                    />
                </FormGroup>
            </FormSection>
            <RightContainer>
            <ChatSection>
                <CustomTabs value={0} aria-label="chat tabs">
                    <Tab label="Chat Logs" />
                </CustomTabs>
                {/* We populate this with discord */}
            </ChatSection>
            <Separator />
                <UploadSection>
                    <CustomTabs value={activeTab} onChange={handleChangeTab} aria-label="upload tabs">
                        <Tab label="Upload" />
                        <Tab label="Options" />
                    </CustomTabs>
                    {activeTab === 0 && (
                        <Box>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                style={{ marginBottom: '16px' }}
                            />
                            <List>
                                {selectedFiles.map((file, index) => (
                                    <ListItem key={index} secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                                            <CloseIcon />
                                        </IconButton>
                                    }>
                                        {file.name}
                                    </ListItem>
                                ))}
                            </List>
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
