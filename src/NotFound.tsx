import { useEffect, useState } from 'react'

import logoEyes from './assets/images/logoeyes.png'

import './NotFound.css'

const messages = [
    "Couldn't find that page.",
    "Sorry. Turned up empty.",
    "Nothing matched that.",
    "Are you sure you've got it right?",
    "Hmmm...",
    "Maybe it's somewhere else.",
    "Wrong number.",
    "Wrong place.",
    "...the end is never the end is never the end is never the end is never the end...",
    "No.",
    "[BUZZER SOUND]",
    "wavyASK AGAIN LATER.",
    "wavyCONCENTRATE AND ASK AGAIN.",
    "wavyREPLY HAZY, TRY AGAIN."
]

const typeInterval = 100
const typeDelay = 500
const typeChance = 0.1
const waveInterval = 40

const initialErr = "037"

const typing = [
    "037|",
    "03|",
    "0|",
    "|",
    "4|",
    "40|",
    "404|",
    "404"
]

function NotFound() {
    // Rolled once per visit, not on every render
    const [rawMessage] = useState(() => messages[Math.floor(Math.random() * messages.length)])
    const [typesErr] = useState(() => Math.random() < typeChance)
    const [errText, setErrText] = useState(typesErr ? initialErr : "404")

    const wavy = rawMessage.startsWith("wavy")
    const message = wavy ? rawMessage.substring(4) : rawMessage

    useEffect(() => {
        document.title = "404"

        if (!typesErr) return

        const timers = typing.map((text, index) =>
            setTimeout(() => setErrText(text), index * typeInterval + typeDelay))

        return () => timers.forEach(clearTimeout)
    }, [typesErr])

    return (
        <div className="not-found">
            <img src={logoEyes} width="100px" style={{ position: 'relative', marginBottom: '-10px' }} />
            <h1 className="err">{errText}</h1>

            <h2 style={{ margin: 0 }}>Page not found.</h2>

            <p>
                <i style={{ color: '#718093' }}>
                    {wavy
                        ? message.split("").map((letter, index) => (
                            <span key={index} className="wavy" style={{ animationDelay: `${index * waveInterval}ms` }}>
                                {letter}
                            </span>
                        ))
                        : message}
                </i>
            </p>

            <a className="home-link" href="/">Take me back</a>
        </div>
    )
}

export default NotFound;
