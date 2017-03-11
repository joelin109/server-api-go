import React from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton, FontIcon } from 'material-ui';
//import { markdown } from 'markdown';
//import md from 'markdown-in-js'
//import { Markdown } from 'react-markdown';
import staticData from './../../util/setting'
import Style from './../../util/style'

const covers = staticData[0]
const thumbs = staticData[1]
const coverCount = covers.length

const Action_List_Github_Repository = 'Action_Github_Repository'
const Action_List_Github_Author = 'Action_Github_Author'
class ItemGithub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.state.loading = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false; //(this.state.total != nextProps.total);
    }


    _handleDetail(e) {
        let action = {
            type: Action_List_Github_Repository,
            data: e.target.id
        }
        this.props.dispatch(action)
    };
    _handleAuthor(e) {
        let action = {
            type: Action_List_Github_Author,
            data: e.target.id
        }
        this.props.dispatch(action)
    };

    _formatNumber(num, precision, separator) {
        var parts;
        if (!isNaN(parseFloat(num)) && isFinite(num)) {
            // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
            // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
            // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
            // 的值变成了 12312312.123456713
            num = Number(num);
            num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
            parts = num.split('.');
            // 整数部分加[separator]分隔, 借用一个著名的正则表达式
            parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

            return parts.join('.');
        }
        return NaN;
    };

    _markdownHtml() {
        let markdownSrc = [
            '# Live demo\n\nChanges are automatically rendered as you type.\n\n* Follows the ',
            '[CommonMark](http://commonmark.org/) spec\n* Renders actual, "native" React DOM ',
            'elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)',
            '\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n',
            '\n## HTML block below\n\n<blockquote>\n    This blockquote will change based ',
            'on the HTML settings above.\n</blockquote>\n\n## How about some code?\n',
            '```js\nvar React = require(\'react\');\nvar Markdown = require(\'react-markdown\');',
            '\n\nReact.render(\n    <Markdown source="# Your markdown here" />,\n    document.',
            'getElementById(\'content\')\n);\n```\n\nPretty neat, eh?\n\n', '## More info?\n\n',
            'Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n',
            '---------------\n\n',
            'A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal',
            ':scissors: Modern :clipboard:'
        ].join('')

       // return <Markdown source={markdownSrc} />;
    }

    render() {
        let coverID = covers[Math.floor(Math.random() * coverCount)] //this.props.src
        let userThumb = this.props.value.owner.avatar_url;
        let repoDateRange = this.props.value.created_at.substring(2, 10) + " ~ " + this.props.value.updated_at.substring(2, 10);
        let repoStarNum = this._formatNumber(this.props.value.stargazers_count)
        let repoDesc = this.props.value.description

        let color = "#bdbdbd"
        let hoverColor = "#EF5350"
        let favorite = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>favorite</FontIcon>;
        let share = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>share</FontIcon>;
        let thumb_up = <FontIcon className="material-icons" color={color} hoverColor={hoverColor}>thumb_up</FontIcon>;
        let labelStyle = { color: '#616161', fontWeight: 'normal', };


        return (

            <div className="itemC">
                <Card className="itemBox">

                    <div className="itemBox-Img">
                        <img className="itemBox-Img-cover" id={this.props.value.html_url} src={coverID}
                            onClick={this._handleDetail.bind(this)} />

                        <img className="itemBox-Img-author" id={this.props.value.owner.html_url} src={userThumb}
                            onClick={this._handleAuthor.bind(this)} />

                        <label style={Style.itemDate}>{repoDateRange}</label>
                    </div>
                    <br />

                    <div className="itemBox-Text">
                        <p className="itemBox-Text-title"><a href={this.props.value.html_url} target="_blank">{this.props.value.name}</a></p>
                        <p className="itemBox-Text-subTitle">{repoDateRange}</p>
                        <p className="itemBox-Text-text">{repoDesc}</p>
                    </div>

                    <div>
                        <FlatButton icon={thumb_up} label={repoStarNum} labelStyle={labelStyle} />
                        <FlatButton icon={share} label={this.props.value.forks} labelStyle={labelStyle} />
                    </div>
                    <div style={{ height: 12 }}> </div>

                </Card>
            </div>
        );
    }
}

export default ItemGithub;