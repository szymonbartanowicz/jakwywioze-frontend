import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const defaultTheme = {
    dark: false,
    colors: {
        green: '#b0e8bc', //kolor przyciskow
        green1: '#55cb8e',
        green2: '#00b999',
        blue: '#00b999',
        blue1: '#00a3a6', // kolor paska menu
        blue2: '#008cb1',
        white: '#FFFFFF'
    },
}
export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        sets: { mdi },
    },
    theme: {
        defaultTheme: 'defaultTheme',
        themes: {
            defaultTheme,
        },
    },
})
