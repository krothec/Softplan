import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'
import Nav from '../templates/Nav'

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

        // return filteredCards.map(c => {
        //     return (
        //         <div>
        //             <Card className="card">
        //                 <CardBody className="card-body">
        //                     <CardTitle className="card-title">
        //                         <i className="fa fa-plus-circle text-success" ></i> {c.partes.ativa.name}
        //                         <i className="fa fa-minus-circle text-danger"></i> {c.partes.passiva.name}
        //                     </CardTitle>
        //                     <CardSubtitle className="card-subtitle">
        //                         {c.classe} - {c.assunto}
        //                     </CardSubtitle>
        //                     <CardText className="card-text">
        //                         {c.numero}
        //                     </CardText>
        //                 </CardBody>
        //             </Card>
        //         </div>
        //     )
        // })

        return filteredCards.map(c => {
            return (
                <div className="pad">
                    <section className="container flex">
                        <div className="item flex-item-1">
                            <i className="fa fa-plus-circle text-success"></i> {c.partes.ativa.name}
                            <i className="fa fa-minus-circle text-danger"></i> {c.partes.passiva.name}
                            <div className="">
                                {c.classe} - {c.assunto}
                            </div>
                            <div className="">
                                {c.numero}
                            </div>
                        </div>
                        <div className="item flex-item-2">
                            <i className="fa fa-bookmark"></i>
                        </div>
                        <div className="item flex-item-3">
                            <i className="fa fa-folder-open"></i>
                        </div>
                    </section>
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