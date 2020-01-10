import React, { Component } from 'react'
import axioApi from './../axioApi'
import loading from './loading.gif'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            site_url: '',
            result_show: false,
            loading_status: false,
            result: [],
            csv_status: false,
            download: false
        }
    }

    //Get url change
    handleChange = e => {
        this.setState({ site_url: e.target.value })
    }

    //Get Sitemap Array hashtag
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ download: false })
        this.setState({ loading_status: true })
        const site_url = { site_url: this.state.site_url }
        if (site_url.site_url.includes("http")) {
            this.state.interval = setInterval(() =>
                axioApi.get("send_sitemap")
                    .then((res) => {
                        const hashtags = []
                        for (let index = 0; index < res.data.result.length; index++) {
                            if (!hashtags.includes(res.data.result[index].hashtag)) {
                                hashtags.push(res.data.result[index].hashtag)
                            }
                        }
                        this.setState({ result_show: true, result: hashtags })
                    }), 2000);
        }
        axioApi.post("get_sitemap", site_url).then((res) => {
            if (res.data.err) {
                alert(res.data.err)
                this.setState({ loading_status: false })
            } else if (res.data.url) {
                this.setState({ loading_status: false })
                var result = res.data.url.split('\n')
                this.setState({ result_show: true, result: result })
            }
        })
    }

    //Get Sitemap whole data
    handleSubmitDownload = async (e) => {
        e.preventDefault();
        this.setState({ download: true })
        const site_url = { site_url: this.state.site_url }
        if (site_url.site_url.includes("http")) {
            this.state.interval = setInterval(() =>
                axioApi.get("send_sitemap")
                    .then((res) => this.setState({ result_show: true, result: res.data.result })), 2000);
        }
        // this.setState({ result_show: true, result: [res.data.url] }))
        if (this.state.csv_status === false) {
            this.setState({ csv_status: true })
            axioApi.post("download_sitemap", site_url).then((res) => {
                if (res.data.err) {
                    alert(res.data.err)
                    this.setState({ loading_status: false, csv_status: false })
                } else if (res.data.result) {
                    this.setState({ loading_status: false })
                }
            })
        }
    }
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-2" style={{ textAlign: "end", padding: 5 }}>
                        <h4><b>Sitemap URL:</b></h4>
                    </div>
                    <div class="col-6">
                        <input type="text" className="form-control" placeholder="https://..." onChange={this.handleChange} />
                    </div>
                    <div class="col-3">
                        <button type="submit" class="btn btn-success" id="get_sitemap_btn" onClick={this.handleSubmit}>Get ArrayMap</button>
                        <button type="submit" class="btn btn-success" style={{ marginLeft: 10 }} onClick={this.handleSubmitDownload}>Get Sitemap</button>
                    </div>
                </div>
                <br />
                {this.state.loading_status && <img src={loading} style={{ width: 200, height: 100 }} alt="loading..." />}
                <div className="container">
                    {this.state.result_show && <TableContainer component={Paper} style={{ maxHeight: 500, overflowY: "visible" }}>

                        <Table aria-label="simple table" >
                            {this.state.download ? <TableHead>
                                <TableRow>
                                    <TableCell><b>URL</b></TableCell>
                                    <TableCell><b>Depth</b></TableCell>
                                    <TableCell><b>Request Time</b></TableCell>
                                </TableRow>
                            </TableHead> :
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>End Points Array</b></TableCell>
                                    </TableRow>
                                </TableHead>
                            }
                            {this.state.download ? this.state.result.map(row =>
                                <TableBody>
                                    <TableCell component="th" scope="row">
                                        {row.url}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.depth}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.requestTime}
                                    </TableCell>
                                </TableBody>
                            ) : this.state.result.map(row =>
                                <TableBody>
                                    <TableCell component="th" scope="row">
                                        {row}
                                    </TableCell>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>}
                </div>
            </div >
        )
    }
}
