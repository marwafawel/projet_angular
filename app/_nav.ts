interface NavAttributes {
    [propName: string]: any;
}
interface NavWrapper {
    attributes: NavAttributes;
    element: string;
}
interface NavBadge {
    text: string;
    variant: string;
}
interface NavLabel {
    class?: string;
    variant: string;
}

export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
    roles?: string[]
}

export const navItems: NavData[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
            variant: 'info',
            text: 'NEW'
        }
    },
    {
        name: 'Site',
        url: '/site',
        icon: 'cui-laptop icons',
        roles: ['superAdmin', 'principal']

    },

    {
        name: 'Utilisateur',
        url: '/employe',
        icon: 'cui-people icons',
        roles: ['superAdmin', 'principal'],
        children: [
            {
                name: 'Fiche utilisateur',
                url: '/employe/Fiche',
                icon: 'fa fa-address-card-o',
                roles: ['superAdmin', 'principal']
            },
            {
                name: 'Liste des utilisateurs',
                url: '/employe/Liste',
                icon: 'cui-list icons',
                roles: ['superAdmin', 'principal']
            }
        ]
    },
    {
        name: 'Véhicule',
        url: '/Véhicule',
        icon: 'fa fa-car fa-lg',
        roles: ['superAdmin', 'principal'],
        children: [
            {
                name: 'Fiche Véhicule',
                url: '/vehicule/cards',
                icon: 'fa fa-file-o',
                roles: ['superAdmin', 'principal']
            },
            {
                name: 'Liste des véhicules ',
                url: '/vehicule/carousels',
                icon: 'cui-list icons',
                roles: ['superAdmin', 'principal']
            }
        ]
    },
    {
        name: 'Amende',
        //url: '/base',
        icon: 'fa fa-file-o',
        roles: ['superAdmin', 'principal'],
        children: [
            {
                name: 'Ajout',
                url: '/amende/add',
                icon: 'icon-puzzle'
            },
            {
                name: 'Liste',
                url: '/amende/list',
                icon: 'cui-list icons'
            }
        ]
    },
    {
        name: 'Conducteur',
        //url: '/base',
        icon: 'cui-people icons',
        roles: ['superAdmin', 'principal'],
        children: [
            {
                name: 'Fiche Conducteur',
                url: '/conducteur/add',
                icon: 'fa fa-file-o'
            },
            {
                name: 'Liste des conducteurs',
                url: '/conducteur/list',
                icon: 'cui-list icons'
            }
        ]
    },
    {
        name: 'Charts',
        url: '/charts',
        icon: 'icon-pie-chart'
    },
    {
        name: 'Icons',
        url: '/icons',
        icon: 'icon-star',
        children: [
            {
                name: 'CoreUI Icons',
                url: '/icons/coreui-icons',
                icon: 'icon-star',
                badge: {
                    variant: 'success',
                    text: 'NEW'
                }
            },
            {
                name: 'Flags',
                url: '/icons/flags',
                icon: 'icon-star'
            },
            {
                name: 'Font Awesome',
                url: '/icons/font-awesome',
                icon: 'icon-star',
                badge: {
                    variant: 'secondary',
                    text: '4.7'
                }
            },
            {
                name: 'Simple Line Icons',
                url: '/icons/simple-line-icons',
                icon: 'icon-star'
            }
        ]
    },
    {
        name: 'Notifications',
        url: '/notifications',
        icon: 'icon-bell',
        children: [
            {
                name: 'Alerts',
                url: '/notifications/alerts',
                icon: 'icon-bell'
            },
            {
                name: 'Badges',
                url: '/notifications/badges',
                icon: 'icon-bell'
            },
            {
                name: 'Modals',
                url: '/notifications/modals',
                icon: 'icon-bell'
            }
        ]
    },
    {
        name: 'Widgets',
        url: '/widgets',
        icon: 'icon-calculator',
        badge: {
            variant: 'info',
            text: 'NEW'
        }
    },
    {
        divider: true
    },
    {
        title: true,
        name: 'Extras',
    },
    {
        name: 'Disabled',
        url: '/dashboard',
        icon: 'icon-ban',
        badge: {
            variant: 'secondary',
            text: 'NEW'
        },
        attributes: { disabled: true },
    },

    // Secondaire
    {
        name: 'Véhicule',
        url: '/secondaire/vehicule/list',
        icon: 'fa fa-car fa-lg',
        roles: ['secondaire']
    },
    {
        name: 'Amende',
        //url: '/base',
        icon: 'fa fa-car fa-lg',
        roles: ['secondaire'],
        url: '/secondaire/amende/list'
    },
];
