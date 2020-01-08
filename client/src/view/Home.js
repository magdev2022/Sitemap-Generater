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
            csv_status: false
        }
    }
    handleChange = e => {
        this.setState({ site_url: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading_status: true })
        const site_url = { site_url: this.state.site_url }
        axioApi.post("get_sitemap", site_url).then((res) => {
            if (res.data.err) {
                alert(res.data.err)
                this.setState({ loading_status: false })
            } else if (res.data.url) {
                console.log(res.data)
                this.setState({ loading_status: false })
                var result = res.data.url.split('\n')
                console.log(result)
                this.setState({ result_show: true, result: result })
            }
        })
    }
    handleSubmitDownload = async (e) => {
        e.preventDefault();
        const site_url = { site_url: this.state.site_url }
        if (site_url.site_url.includes("http")) {
            this.state.interval = setInterval(() =>
                axioApi.get("send_sitemap")
                    .then((res) => this.setState({ result_show: true, result: [res.data.url] })), 2000);
        }
        if (this.state.csv_status === false) {
            this.setState({ csv_status: true })
            axioApi.post("download_sitemap", site_url).then((res) => {
                if (res.data.err) {
                    alert(res.data.err)
                    console.log(res.data.err)
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
                    <div class="col-2">
                        <h4>Sitemap URL:</h4>
                    </div>
                    <div class="col-5">
                        <input type="text" className="form-control" placeholder="https://..." onChange={this.handleChange} />
                    </div>
                    <div class="col-3">
                        <button type="submit" class="btn btn-primary" id="get_sitemap_btn" onClick={this.handleSubmit}>Get ArrayMap</button>
                        <button type="submit" class="btn btn-primary" style={{ marginLeft: 10 }} onClick={this.handleSubmitDownload}>Get Sitemap</button>
                    </div>
                </div>
                <br />
                {this.state.loading_status && <img src={loading} style={{ width: 500, height: 400 }} alt="loading..." />}
                <div className="container">
                    {this.state.result_show && <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Result of Sitemap</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.result.map(row => (
                                    <TableRow key={row}>
                                        <TableCell component="th" scope="row">
                                            {row}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </div>
            </div >
        )
    }
}
