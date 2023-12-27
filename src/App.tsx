import React, {useState} from 'react'
import './App.css'
import Button from '@mui/material/Button'
import {
    Box,
    ThemeProvider,
    IconButton,
    Typography,
    CssBaseline,
    Divider,
    List,
    Grid,
    Paper,
    Container,
    Link,
    styled,
    createTheme,
    TextField,
    Select,
    MenuItem
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {mainListItems, secondaryListItems} from './listItems'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Title from './Title'
import {ResponsiveContainer} from 'recharts'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import LinkIcon from '@mui/icons-material/Link'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://emnlts.github.io/">
                Emnlts
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
)

const defaultTheme = createTheme()

function App() {
    const [open, setOpen] = React.useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }
    const [wallets, setWallets] = useState('0xd8da6bf26964af9d7eed9e03e53415d37aa96045')
    const [signature, setSignature] = useState('https://etherscan.io/address/<address>')

    function urlHref(wallet: string) {
        return signature.replace('<address>', wallet)
    }

    function urlHtml(url: string): string {
        return `<a target="_blank" rel="noreferrer" href="${url}">${url}</a>`
    }

    function openUrls(wallets: string[]) {
        wallets
            .forEach((wallet: string) => {
                window.open(urlHref(wallet), '_blank')
            })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            Airdrop Checker
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{my: 1}}/>
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 3, mb: 3}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <React.Fragment>
                                        <Title>Airdrop Checker</Title>
                                        <ResponsiveContainer>
                                            <div>Quickly check a bulk list of wallet addresses against a website or
                                                endpoint. No
                                                need to connect any wallet. Select a common website or specify the
                                                wallet address pattern. No limit on the number of wallets but lag will
                                                likely happen when opening more than fifty.
                                            </div>
                                        </ResponsiveContainer>
                                    </React.Fragment>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="lg" sx={{mt: 3, mb: 3}}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <React.Fragment>
                                <Title>Configuration</Title>
                                <Grid container xs={12} md={12} lg={12}>
                                    <Grid item xs={2} md={2} lg={2}>Select a common website</Grid>
                                    <Grid item xs={10} md={10} lg={10} sx={{pl:2}}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={signature}
                                            label="Signature"
                                            onChange={e => setSignature(e.target.value)}
                                        >
                                            <MenuItem
                                                value={'https://etherscan.io/address/<address>'}>Etherscan</MenuItem>
                                            <MenuItem
                                                value={'https://debank.com/profile/<address>'}>DeBank</MenuItem>
                                            <MenuItem
                                                value={'https://blockscan.com/address/<address>'}>Blockscan</MenuItem>
                                            <MenuItem value={''}>--- Airdrops ---</MenuItem>
                                            <MenuItem
                                                value={'https://earni.fi/?address=<address>'}>EarnFi</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                                <Grid container xs={12} md={12} lg={12} sx={{mt:3}}>
                                    <Grid item xs={2} md={2} lg={2}>Define the pattern (<i>&#x3C;address&#x3E;</i> must
                                        be present)</Grid>
                                    <Grid item xs={10} md={10} lg={10} sx={{pl:2}}>
                                        <TextField id="signature"
                                                   fullWidth
                                                   label="Customize the endpoint pattern (optional)"
                                                   variant="standard"
                                                   color={signature ? 'success' : 'warning'}
                                                   onChange={e => setSignature(e.target.value)}
                                                   value={signature}/>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Paper>
                    </Container>
                    <Container maxWidth="lg" sx={{mt: 3, mb: 3}}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <React.Fragment>
                                <Title>Wallets input</Title>
                                <Grid container xs={12} md={12} lg={12}>
                                    <Grid item xs={2} md={2} lg={2}>Set wallets</Grid>
                                    <Grid item xs={10} md={10} lg={10} sx={{pl:1}}>
                                        <TextField id="wallets"
                                                   fullWidth
                                                   multiline
                                                   rows={10}
                                                   label="Wallets"
                                                   variant="standard"
                                                   color={wallets ? 'success' : 'warning'}
                                                   onChange={e => setWallets(e.target.value)}
                                                   value={wallets}/>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Paper>
                    </Container>
                    <Container maxWidth="lg" sx={{mt: 3, mb: 3}}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <React.Fragment>
                                <Title>Wallets output</Title>

                                <Button variant="outlined"
                                        sx={{pb: 1, pt: 1, mb: 2, mt: 2}}
                                        onClick={() => openUrls(wallets.split('\n'))}
                                ><LinkIcon sx={{mr: 2}}/> Open all wallet addresses in this browser window</Button>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#ID</TableCell>
                                            <TableCell>Wallet Link</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {wallets.split('\n').map((wallet, index) => (
                                            <TableRow key={index + 1}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                            <span
                                                                dangerouslySetInnerHTML={{__html: urlHtml(urlHref(wallet))}}>
                                                            </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </React.Fragment>
                        </Paper>
                        <Copyright sx={{pt: 4}}/>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
