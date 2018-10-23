import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class BsTree extends Component {

  constructor (props) {
    super(props)
    this.mytreeRef = React.createRef()
    this.bstreeDataRef = React.createRef()
    this.statusRef = React.createRef()
  }

  componentDidMount () {
    const $hiddenInput = $(this.bstreeDataRef.current)
    const $status = $(this.statusRef.current)

    $(this.mytreeRef.current).bstree({
      isExpanded: true,
      dataSource: $hiddenInput,
      initValues: $hiddenInput.data('ancestors'),
      onDataPush: function (values) {
        var def = '<strong>Watched:&nbsp;</strong>'
        for (var i in values) {
          def += '<span>' + values[i] + '&nbsp;</span>'
        }
        $status.html(def)
      },
      updateNodeTitle: function (node, title) {
        return '<span class="label label-default">' + node.attr('data-id') + '</span> ' + title
      }
    })
  }

  render () {
    return (
      <div>
        <div className="alert alert-primary" role="alert" ref={this.statusRef}>{''}</div>
        <input id="bstree-data" type="hidden" name="bstree-data" data-ancestors="S01:S02E01" ref={this.bstreeDataRef} />
        <div id="mytree" className="bstree" ref={this.mytreeRef}>
          <ul>
            <li data-id="TV_SHOW" data-level="0"><span>True Detective</span>
              <ul>
                <li data-id="S01" data-level="1"><span>Season 1</span>
                  <ul>
                    <li data-id="S01E01" data-level="2"><span>The Long Bright Dark</span></li>
                    <li data-id="S01E02" data-level="2"><span>Seeing Things </span></li>
                    <li data-id="S01E03" data-level="2"><span>The Locked Room</span></li>
                    <li data-id="S01E04" data-level="2"><span>Who Goes There?</span></li>
                    <li data-id="S01E05" data-level="2"><span>The Secret Fate of All Life</span></li>
                    <li data-id="S01E06" data-level="2"><span>Haunted Houses</span></li>
                    <li data-id="S01E07" data-level="2"><span>After You've Gone</span></li>
                    <li data-id="S01E08" data-level="2"><span>Form and Void</span></li>
                  </ul>
                </li>
                <li data-id="S02" data-level="1"><span>Season 2</span>
                  <ul>
                    <li data-id="S02E01" data-level="2"><span>The Western Book of the Dead</span></li>
                    <li data-id="S02E02" data-level="2"><span>Night Finds You </span></li>
                    <li data-id="S02E03" data-level="2"><span>Maybe Tomorrow</span></li>
                    <li data-id="S02E04" data-level="2"><span>Down Will Come</span></li>
                    <li data-id="S02E05" data-level="2"><span>Other Lives</span></li>
                    <li data-id="S02E06" data-level="2"><span>Church in Ruins</span></li>
                    <li data-id="S02E07" data-level="2"><span>Black Maps and Motel Rooms</span></li>
                    <li data-id="S02E08" data-level="2"><span>Omega Station</span></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<BsTree/>, document.getElementById('mytree'))
