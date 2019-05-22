import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'
import Nav from '../templates/Nav'
import PopOver from '../templates/PopOver'

const baseUrl = 'http://localhost:3001'
const initialState = {
    cards: [],
    tags: [],
    selectedTag: ''
}

export default class Home extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(`${baseUrl}/db`).then(resp => {
            this.setState({
                cards: resp.data.cards,
                tags: resp.data.tags
            })
        })
    }

    selectTag = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }

    setTag = (cardId) => {
        return (tagId) => {

            const modifiedCards = this.state.cards.map((card) => {
                if (card.id === cardId) {
                    return {
                        ...card,
                        tag: [...card.tag, tagId]
                    };
                } else {
                    return card;
                }
            });

            this.setState({
                cards: modifiedCards
            })
        }
    }

    createTag = (name) => {
        this.setState({
            tags: [
                ...this.state.tags,
                {
                    id: this.state.tags.length + 1,
                    name,
                    color: "#FFF",
                    background: "#49bdce"
                }
            ]
        })
    }

    renderCards() {
        const filteredCards = this.state.cards.filter(card => {
            if (this.state.selectedTag === '') return true

            return card.tag.includes(parseInt(this.state.selectedTag))
        })

        return filteredCards.map(card => {
            return (
                <div key={card.id} className="pad">
                    <div className="row">
                        <div className="column left col-md-6">
                            <div className="row">
                                <i className="name-left fa fa-plus-circle text-success"></i> {card.partes.ativa.name}
                                <i className="name-right fa fa-minus-circle text-danger"></i> {card.partes.passiva.name}
                            </div>
                            <div className="row">
                                {card.classe} - <b className="subject"> {card.assunto}</b>
                            </div>
                            <div className="row">
                                {card.numero}
                            </div>
                        </div>
                        <div className="column middle col-md-3">
                            <p className="icon-folder"><i className="fa fa-folder-open"></i> Abrir pasta</p>

                        </div>
                        <div className="column right col-md-3">
                            <div className="row">
                                <div>
                                    <PopOver
                                        tags={this.state.tags}
                                        onSetTag={this.setTag(card.id)}
                                    />
                                </div>
                                <div>
                                    {card.tag.map(tagId => {
                                        const tag = this.state.tags.find((tag) => {
                                            return tag.id == tagId
                                        })
                                        return (
                                            <p>
                                                <span
                                                    key={tagId}
                                                    style={{ backgroundColor: tag.background, color: tag.color }}
                                                >
                                                    {tag.name}
                                                </span>
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                <Nav
                    tags={this.state.tags}
                    cards={this.state.cards}
                    selectedTag={this.state.selectedTag}
                    onSelectTag={this.selectTag}
                    onCreateTag={this.createTag}
                />
                <main className="content">
                    <div className="search"> <i className="fa fa-search"></i> Buscar </div>
                    <div className="container-fluid">
                        {this.renderCards()}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}