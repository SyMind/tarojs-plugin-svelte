const fs = require('fs')
const path = require('path')
const { DEFAULT_Components } = require('@tarojs/runner-utils')

function unIndent(strings, ...values) {
    const text = String.raw(strings, ...values)
    const lines = text.replace(/^\n/u, '').replace(/\n\s*$/u, '').split('\n')
    const lineIndents = lines.filter(line => line.trim()).map(line => line.match(/ */u)[0].length)
    const minLineIndent = Math.min(...lineIndents)
    return lines.map(line => line.slice(minLineIndent)).join('\n')
}

for (const tag of DEFAULT_Components) {
    const template = unIndent`
        <script>
            import { get_current_component } from 'svelte/internal';
            import { createEventForwarder } from './forward-events'

            const forwardEvents = createEventForwarder(get_current_component())
        </script>

        <${tag} use:forwardEvents {...$$restProps}></${tag}>
    `

    fs.writeFileSync(path.resolve(__dirname, `../lib/components/${tag}.svelte`)
}
