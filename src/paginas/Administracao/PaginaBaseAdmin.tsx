import {AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link as RouterLink, Outlet} from 'react-router-dom';

export default function PaginaBaseAdmin () {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {/* Usando o Link do reouter no Link do mui */}
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: 'white' }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            {/* Conteúdo */}
            <Outlet/>
          </Paper>
        </Container>
      </Box>
    </>
  );
}