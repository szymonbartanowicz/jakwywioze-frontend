import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const defaultTheme = {
    dark: false,
    colors: {
        green: '#00C500',
        blue: '#007199',
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
