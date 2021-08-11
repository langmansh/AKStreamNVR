import React from 'react';
import {UnControlled as CodeMirror} from "react-codemirror2";



import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';

import 'codemirror/mode/javascript/javascript'

import jsonlint from 'jsonlint-mod'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
window.jsonlint = jsonlint

export default class RvJsonCodeMirror extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            initValue: this.props.value
        }
    }

    componentDidMount() {
        this.editor.setSize('100%', `${this.props.height}px`);
    }

    render() {
        return (
            <CodeMirror
                value={this.state.initValue}
                editorDidMount={editor => {
                    this.editor = editor
                }}
                options={{
                    mode: 'application/json',
                    lint: true,
                    gutters: ['CodeMirror-lint-markers'],
                    theme: 'solarized dark',
                    lineNumbers: true
                }}

                onBeforeChange={(editor, data, value,next) => {
                    next();
                }}
                onChange={(editor, data, value) => {
                    this.props.onChange && this.props.onChange(value)
                }}
            />
        );
    }

    static defaultProps = {
        height: 300
    }
}
