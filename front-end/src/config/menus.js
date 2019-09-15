/*
https://material.io/resources/icons/?style=baseline

{
        name: 'Home',
        url: '',
        icon: 'mood',
        submenus: [
              {
                name: 'My Hackathons',
                icon: 'weekend',
                url: '/my-hackathons',
                padding: 10
            },
            {
                name: 'submenu2',
                icon: 'weekend',
                padding: 10
            }
        ]
    }

*/
export const menus = [
    {
        name: 'Profile',
        key: 1,
        url: '/profile',
        icon: 'emoji_emotions',
        submenus: []
    },
    {
        name: 'Hackathons',
        key: 2,
        url: '/hackathons',
        icon: 'whatshot',
        submenus: []
    }
]