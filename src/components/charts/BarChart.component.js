//BarChart.component.js

import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

export default class BarChart extends Component
{
   constructor(props) {
      super(props);
      this.state = {
        Data: {}
      }
    }
        
      componentDidMount() {
        axios.get(`http://localhost:4000/users`)
          .then(res => {
            const user = res.data;
            let email = [];
            let createdAt = [];
            user.forEach(element => {
              email.push(element.email);
              createdAt.push(element.createdAt);
            });
            this.setState({ 
              Data: {
                labels: email,
                datasets:[
                   {
                      label:'User Chart',
                      data: createdAt ,
                      backgroundColor:[
                       'rgba(255,105,145,0.6)',
                       'rgba(155,100,210,0.6)',
                       'rgba(90,178,255,0.6)',
                       'rgba(240,134,67,0.6)',
                       'rgba(120,120,120,0.6)',
                       'rgba(250,55,197,0.6)'
                    ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                      borderWidth: 1
                   }
                ]
             }
             });
          })
      }
 render()
   {
      return(
        <div>
          <Bar
            data = {this.state.Data}
            options = {{ maintainAspectRatio: false }} />
        </div>
      )
   }
}