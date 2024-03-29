import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api';


class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      isFetching: false,
      isError: false,
      currentPage: 1,
    }

  }

  load = () => {
    const {currentPage} = this.state;
    getUsers({page:currentPage, res:3})
      .then((data)=>this.setState({
        users:data.results,
      }))
      .catch(()=>this.setState({
        isError: true
      }))
      .finally(()=>this.setState({
        isFetching: false,
      }))
  }

  componentDidMount(){
    this.setState({
      isFetching: true,
    })
    this.load();
  }
  componentDidUpdate(prevProps, prevState){
    const {currentPage} = this.state;
    if(currentPage!==prevState.currentPage){
      this.load();
    }
  }

  prevPage = () => {
    if(this.state.currentPage>1){
      this.setState((state,props)=>
      ({currentPage:state.currentPage-1})
      );
    }
  }
  nextPage = () => this.setState((state,props)=>
  ({currentPage:state.currentPage+1}));

  render() {
    const {users, isFetching, isError, currentPage} = this.state;
    // if(isError){
    //   return <div>Error</div>;
    // }
    // if(isFetching){
    //   return <div>Loading...</div>;
    // }
    return <div>
      
      {isFetching && <div>Loading...</div>}
      {isError && <div>Error</div>}
      
      <h2>Users list</h2>
      <button onClick={this.prevPage}>&lt;</button>
      <button onClick={this.nextPage}>&gt;</button>
      <p>current page: {currentPage}</p>
      <ul>
        {users.map((user)=>(
          <li key={user.login.uuid}>{JSON.stringify(user,null, 7)}</li>
        ))}
      </ul>
    </div>;

  }
}


UsersLoader.propTypes = {};


export default UsersLoader;
