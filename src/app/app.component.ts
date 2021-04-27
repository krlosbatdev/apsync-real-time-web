import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify'
import { Observable } from 'rxjs';

const query = `
  query listWorkOrders {
    listWorkOrders {
      id name completed
    }
  }
  `;
const mutation = `
  mutation createWorkOrder($workOrder: WorkOrderInput!) {
    createWorkOrder(workOrder: $workOrder) {
      id name completed
    }
  }
`;
const subscription = `
  subscription onCreateWorkOrder {
    onCreateWorkOrder {
      id name completed
    }
  }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  count = 0;

  ngOnInit(): void {
    this.fetchWorkOrders();
    this.subscribe();
  }
  title = 'amplify-app';


  async fetchWorkOrders() {
    const data = await API.graphql({ query })
    console.log('data from GraphQL:', data)
  }

  async createWorkOrder() {
    this.count++;
    await API.graphql({
      query: mutation,
      variables: { workOrder: { id: this.count, name: 'WorkOrder 1', completed: false } }
    })
    console.log('workOrder successfully created!')
  }

  subscribe() {
    var subs = API.graphql({
      query: subscription
    }) as unknown as Observable<any>;

    subs.subscribe({
      next: workOrderData => {
        console.log('Subscription workOrderData: ', workOrderData)
      }
    })
  }

}
