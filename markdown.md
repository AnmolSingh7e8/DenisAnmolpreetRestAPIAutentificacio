# Documentació de l'API REST - Gestor de Reserves

## Descripció
Aquesta API  permet gestionar un sistema de reserves, incloent usuaris, recursos, reserves i notificacions.

## Rutes de l'API
### Usuaris
| Mètode | Ruta              | Descripció |
|--------|-------------------|------------|
| GET    | `/usuari`        | Llista tots els usuaris |
| GET    | `/usuari/:id`    | Obté un usuari per ID |
| POST   | `/usuari`        | Crea un nou usuari |
| PUT    | `/usuari/:id`    | Actualitza un usuari |
| DELETE | `/usuari/:id`    | Elimina un usuari |

### Recursos
| Mètode | Ruta               | Descripció |
|--------|--------------------|------------|
| GET    | `/recursos`        | Llista tots els recursos |
| GET    | `/recursos/:id`    | Obté un recurs per ID |
| POST   | `/recursos`        | Crea un nou recurs |
| PUT    | `/recursos/:id`    | Actualitza un recurs |
| DELETE | `/recursos/:id`    | Elimina un recurs |

### Reserves
| Mètode | Ruta               | Descripció |
|--------|--------------------|------------|
| GET    | `/reserves`        | Llista totes les reserves |
| GET    | `/reserves/:id`    | Obté una reserva per ID |
| POST   | `/reserves`        | Crea una nova reserva |
| PUT    | `/reserves/:id`    | Actualitza una reserva |
| DELETE | `/reserves/:id`    | Elimina una reserva |

### Notificacions
| Mètode | Ruta                  | Descripció |
|--------|-----------------------|------------|
| GET    | `/notificacions`       | Llista totes les notificacions |
| GET    | `/notificacions/:id`   | Obté una notificació per ID |
| POST   | `/notificacions`       | Crea una nova notificació |
| PUT    | `/notificacions/:id`   | Actualitza una notificació |
| DELETE | `/notificacions/:id`   | Elimina una notificació |

## Regles de Negoci
- **Gestió d'usuaris**: Cada usuari té un identificador únic, correu electrònic únic i rol (client o administrador). Només els administradors poden gestionar recursos.
- **Gestió de recursos**: Cada recurs té un tipus (sala, vehicle, equipament) i un estat (disponible, reservat, fora de servei).
- **Gestió de reserves**: Una reserva té un estat (activa, cancel·lada, completada) i assegura que un recurs només pot estar reservat en un moment concret.
- **Notificacions**: Enregistren missatges associats a reserves i usuaris per a notificacions internes.
-- --