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
                if (card.id == cardId) {
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







            // const cardIndex = this.state.cards.findIndex((card) => {
            //     return card.id == cardId
            // })
            // const card = this.state.cards[cardIndex]
            // const modifiedCard = {
            //     ...card,
            //     tag: [...card.tag, tagId]
            // };

            // const arrStart = this.state.cards.slice(0, cardIndex)

            // const arrEnd = this.state.cards.slice(cardIndex + 1, this.state.cards.length)

            // this.setState({
            //     cards: [
            //         ...arrStart,
            //         modifiedCard,
            //         ...arrEnd,
            //     ]
            // })
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
                                <i className="fa fa-plus-circle text-success name"></i> {card.partes.ativa.name}
                                <i className="fa fa-minus-circle text-danger name2"></i> {card.partes.passiva.name}
                            </div>
                            <div className="row subject">
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
                            <PopOver
                                tags={this.state.tags}
                                selectedTag={this.state.selectedTag}
                                onSelectTag={this.selectTag}
                                onSetTag={this.setTag(card.id)}
                            // (tag) => {}
                            />
                            <div>
                                {card.tag.map(tagId => {
                                    const tag = this.state.tags.find((tag) => {
                                        return tag.id == tagId
                                    })
                                    return (
                                        <span key={tagId} style={{ backgroundColor: tag.background, color: tag.color }}>
                                            {tag.name}
                                        </span>
                                    )
                                })}
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