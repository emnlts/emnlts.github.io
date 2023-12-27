import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PaidIcon from '@mui/icons-material/Paid';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Airdrop Checker" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            v0.1.1 @ 27/12/2023
        </ListSubheader>
    </React.Fragment>
);