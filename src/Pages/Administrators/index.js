import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Link, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Drawer from '../../Components/Drawer'
import NavBar from '../../Components/NavBar';


import AdministratorIcon from '../../assets/icons/administrators';
import Content from '../../Components/Content';
import AdministratorHome from '../../Components/AdministratorHome';



const theme = createTheme({
    palette: {
        primary: {
            main: '#323232',
        },
        secondary: {
            main: '#4FB9BB',
        },
        tertiary: {
            main: '#E8EAF0'
        }
    },
});

const menuOptions = [
    {
        key: 'administrators',
        title: 'Administradores',
        homeTitle:'Administradores de la consola',
        icon: <AdministratorIcon />,
        component: <AdministratorHome />
    },
    {
        key: 'catalogs',
        title: 'Catalogos',
        icon: <AdministratorIcon />
    },
    {
        key: 'leaders',
        title: 'Líderes',
        icon: <AdministratorIcon />
    },
    {
        key: 'users',
        title: 'Usuarios',
        icon: <AdministratorIcon />
    },
    {
        key: 'company',
        title: 'Mi empresa',
        icon: <AdministratorIcon color='secondary' />
    },
    {
        key: 'courses',
        title: 'Cursos',
        icon: <AdministratorIcon color='secondary' />
    },
    {
        key: 'rewards',
        title: 'Recompensas',
        icon: <AdministratorIcon color='secondary' />
    },
    {
        key: 'events',
        title: 'Eventos',
        icon: <AdministratorIcon color='secondary' />
    },
    {
        key: 'notifications',
        title: 'Notificaciones',
        icon: <AdministratorIcon color='secondary' />
    },
    {
        key: 'reports',
        title: 'Reportes',
        icon: <AdministratorIcon color='secondary' />
    }
]


export default function Administrators() {

    const [section, setSection] = useState(null)

    const breadcrumbs = [
        <Link underline="hover" key="home" color="tertiary" sx={{ cursor: 'pointer' }} onClick={() => { setSection(null) }} >
            Inicio
        </Link>,
        <Typography key="section" color='secondary'>
            {section?.title}
        </Typography>,
    ];

    const addBreadCrumb = (key, option) => {
        breadcrumbs.push(
            <Link underline="hover" key={key} color="inherit" sx={{ cursor: 'pointer' }} onClick={() => { setSection(null) }} >
                {option}
            </Link>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavBar />
                <Drawer menuOptions={menuOptions} setSection={setSection} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginTop: '24px' }}>
                        {breadcrumbs}
                    </Breadcrumbs>
                    <Content title={section?.homeTitle}>
                        {section?.component}
                    </Content>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
