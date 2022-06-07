import { useState } from "react"
import { Link } from 'react-router-dom'
import api from "../services/api"

export default function Home() {
    return (
        <div>
            <p>Choose your option!</p>
            <ul>
                <li><Link to="/quote">Quote: Stock's most recent information</Link></li>
                <li><Link to="/history">History: Stock's history informations</Link></li>
                <li><Link to="/compare">Compare: Compare informations for more than one sotcks</Link></li>
                <li><Link to="/gains">Gains: How much you'de profit if invested in X stock at YYYY-MM-DD</Link></li>
            </ul>
        </div>
    )
}