import React, { Component } from "react";
import Navbar from "./Navbar";
import News from "./News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export class App extends Component {
   pageSize=5;
   countryName='us'
   
  render() {
  
    return (
     
        <Router>
          <Navbar/>
          <Routes>
          <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="general"/>}/>
          <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="business"/> }/>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="entertainment"/> }/>
          <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="general"/>}/>
          <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="health"/> }/>
          <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="science"/>}/> 
          <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="sports"/>}/> 
          <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country={this.countryName} headTitle="America" category="technology"/> }/>
          </Routes>
        </Router>
     
    );
  }
}

export default App;

