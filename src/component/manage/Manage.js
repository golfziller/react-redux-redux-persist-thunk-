import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './Manage.css'
import axios from 'axios'

const inint = {

  addData: {
    id: '',
    listName: '',
    money: '',
    type: '',
    startDate: moment(),
  },
  showData: []

}
class Manage extends Component {
  constructor(props) {
    super(props)
    this.state = inint
    this.showModal = React.createRef();
  }
  componentDidMount = () => {
    this.getDaily();
  }
  getDaily = () => {
    let { userInfo } = this.props

    if (!userInfo.user.userId) { return window.location.href = '/login' }
    let id = userInfo.user.userId
    let token = userInfo.user.token
    if (id && token) {
      axios.get(`http://localhost:3000/api/dailies?filter[where][userId]=${id}&access_token=${token}`).then((res) => {
        
        this.setState({ showData: res.data })
      })
    }

  }

  handleChange = (date) => {
    // this.setState({...this.state.addData, startDate: date});
    this.setState({
      addData: {
        ...this.state.addData,
        startDate: date
      }
    })
  }
  listNameChange = async (event) => {

    this.setState({
      addData: {
        ...this.state.addData,
        listName: event.target.value
      }
    })

  }
  moneyChange = (evt) => {
    // this.setState({...this.state.addData, money:evt.target.value.replace(/\D/, '')});
    this.setState({
      addData: {
        ...this.state.addData,
        money: evt.target.value.replace(/\D/, '')
      }
    })
  }

  typeChange = (event) => {
    // this.setState({...this.state.addData, type:event.target.value});
    this.setState({
      addData: {
        ...this.state.addData,
        type: event.target.value
      }
    })
  }
  showModalFnc = () => {
    this.setState({ addData: inint.addData })
    this.showModal.click()
  }
  submit = () => {
    let { userInfo } = this.props
    let id = userInfo.user.userId
    let token = userInfo.user.token
    let { addData } = this.state
    if (addData.listName && addData.money && addData.type && addData.startDate && id && token) {

      if (addData.id) {

        let data = {
          "id": addData.id,
          "userId": id,
          "listName": addData.listName,
          "money": addData.money,
          "type": addData.type,
          "byDate": addData.startDate,
          "createDate": moment()
        }
        axios.put(`http://localhost:3000/api/dailies?access_token=${token}`, data).then((res) => {
          alert('บันทึกข้อมูลสำเร็จ')
          window.location.reload()
        })
      } else {
        let data = {

          "userId": id,
          "listName": addData.listName,
          "money": addData.money,
          "type": addData.type,
          "byDate": addData.startDate,
          "createDate": moment()


        }
        axios.post(`http://localhost:3000/api/dailies?access_token=${token}`, data).then((res) => {
          alert('บันทึกข้อมูลสำเร็จ')
          window.location.reload()

        }).catch((err) => {
          console.log('in err in manage')
        })

      }



    } else {
      alert('Please input data')
    }
  }
  checkStatusLogin = () => {
    let { userInfo } = this.props
    if (userInfo.user && userInfo.user.token) {

    } else {
      window.location.href = "/"
    }
  }
  update = (data) => {
    if (data) {
      console.log(data)
      this.setState({
        addData: {
          id: data.id,
          listName: data.listName,
          money: data.money,
          type: data.type,
          startDate: moment(data.byDate)
        }
      })
      this.showModal.click()
    }

  }
  delete = (id) => {
    let { userInfo } = this.props
    let token = userInfo.user.token
    if (id && token) {
      axios.delete(`http://localhost:3000/api/dailies/${id}?access_token=${token}`).then((res) => {
        alert('ลบข้อมูลเรียบร้อย')
        window.location.reload()
      })
    }
  }
  rederDataShow = () => {
    let { showData } = this.state
    if (showData && showData.length > 0) {

      return showData.map((e, i) => {
        let money = e.type == 'out' ? e.money * -1 : e.money
        return (
          <tr key={i}>
            <td className="text-center">{i + 1}</td>
            <td>{e.listName}</td>
            <td className="text-center">{money}</td>
            <td className="text-center">{moment(e.byDate).format('DD/MM/YYYY')}</td>
            <td className="text-center">
              <div className="row">
                <div className="col-xs-6"> <a onClick={() => this.update(e)}>แก้ไข</a></div>
                <div className="col-xs-6"> <a onClick={() => this.delete(e.id)}>ลบ</a></div>
              </div>


            </td>
          </tr>
        )
      })
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 text-right">
            <button className="btn btn-info">Log out</button>
          </div>
        </div>
        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th style={{ width: '5%' }}> No.</th>
                        <th style={{ width: '50%' }}> Listname</th>
                        <th style={{ width: '10%' }}> Money</th>
                        <th style={{ width: '10%' }}> Date by</th>
                        <th style={{ width: '5%' }}> Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.rederDataShow()}
                    </tbody>
                  </table>
                </div>
                <div className="panel-footer text-center">
                  <button className="btn btn-success " onClick={this.showModalFnc} >Add</button>
                  <button className="btn btn-success hide " ref={button => this.showModal = button} data-target="#myModal" data-toggle="modal" >Add</button>

                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog  modal-sm">


            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Add List</h4>
              </div>
              <div className="modal-body">
                <form >
                  <div className="form-group">
                    <label>List Name:</label>
                    <input type="text" className="form-control" value={this.state.addData.listName} onChange={this.listNameChange} />
                  </div>
                  <div className="form-group">
                    <label>Money:</label>
                    <input className="form-control" value={this.state.addData.money} onChange={this.moneyChange} />

                  </div>
                  <div className="form-group">
                    <label>Money:</label>
                    <select className="form-control" value={this.state.addData.type} onChange={this.typeChange}>
                      <option value=''>--Select--</option>
                      <option value='in'>Income</option>
                      <option value='out'>Cash out</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date by:</label>
                    <DatePicker
                      inline
                      selected={this.state.addData.startDate}
                      dateFormat="DD/MM/YYYY"
                      onChange={this.handleChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success" onClick={this.submit}>Submit</button>

              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setLogIn:(data)=>dispatch(setLogIn(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
