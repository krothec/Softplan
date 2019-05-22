import './Nav.css'
import React, { Component } from 'react'
import { Button } from 'reactstrap';

export default class Nav extends Component {

    state = {
        tagName: ''
    }

    handleChange = (e) => {
        this.setState({ tagName: e.target.value })
    }

    countCardsByTag = (id) => {
        return this.props.cards.filter(card => {
            return card.tag.includes(parseInt(id))
        }).length
    }

    render() {
        const props = this.props

        return (
            <aside className="menu-area">
                <nav className="menu">
                    <div className="process">
                        Processos
            </div>
                    <div
                        className="all-process"
                        style={{ backgroundColor: props.selectedTag === '' ? '#EAEAEA' : '#F4F4F4' }}
                    >
                        <Button
                            onClick={() => props.onSelectTag('')}
                            color="link"
                        >
                            <span>
                                <i className="fa fa-bookmark"></i> Todos Processos
                            </span>
                            <span>
                                {props.cards.length}
                            </span>
                        </Button>
                    </div>
                    <div className="tag-title">
                        Etiquetas
            </div>
                    {props.tags.map(tag => {
                        return (
                            <div
                                className="tag"
                                style={{ backgroundColor: props.selectedTag == tag.id ? '#EAEAEA' : '#F4F4F4' }}
                            >
                                <Button
                                    onClick={() => props.onSelectTag(tag.id)}
                                    color="link"
                                >
                                    <span>
                                        {tag.name}
                                    </span>
                                    <span>
                                        {this.countCardsByTag(tag.id)}
                                    </span>
                                </Button>
                            </div>
                        )
                    })}
                    <div className="tag-create">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            props.onCreateTag(this.state.tagName)
                            this.setState({ tagName: '' })
                        }}>
                            <i className="fa fa-tag"></i>
                            <input type="text"
                                placeholder="Criar Etiqueta"
                                value={this.state.tagName}
                                onChange={this.handleChange} />
                        </form>
                    </div>
                </nav>
            </aside>
        )
    }

}