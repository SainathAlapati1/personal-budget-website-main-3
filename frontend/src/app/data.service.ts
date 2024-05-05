// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   constructor() { }
// }

import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { AllocatedBudget } from './config-budget/AllocatedBudget';
import { Earnings } from './budget-planner/dashboard/earnings/Earnings';
import { Expenditure } from './budget-planner/dashboard/expenditure/Expenditure';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  public respData: any = [];
  // Earnings APIs
  private earningsUrl = 'http://localhost:3000/earnings';

  insertEarningsData(userId: string, earnings: any): Observable<Earnings[]> {
    return from(
      axios
        .post<Earnings[]>(`${this.earningsUrl}/${userId}`, earnings)
        .then((resp) => resp.data)
        .catch((error) => {
          return error;
        })
    );
  }
  updateEarningsData(userId: string, earnings: any): Observable<Earnings[]> {
    return from(
      axios
        .put<Earnings[]>(
          `${this.earningsUrl}/month/${earnings.months}/year/${earnings.years}/${userId}`,
          earnings
        )
        .then((resp) => {
          resp.data;
        })
        .catch((error) => error)
    );
  }
  getEarningsData(userId: string): Observable<Earnings[]> {
    return from(
      axios
        .get<Earnings[]>(`${this.earningsUrl}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }

  getEarningsByMonth(
    userId: string,
    month: any,
    year: any
  ): Observable<Earnings[]> {
    return from(
      axios
        .get<Earnings[]>(
          `${this.earningsUrl}/month/${month}/year/${year}/${userId}`
        )
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }

  getEarningsByMonthAndYear(
    userId: string,
    month: any,
    year: any
  ): Observable<Earnings[]> {
    return from(
      axios
        .get<any[]>(`${this.earningsUrl}/month/${month}/year/${year}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => {
          return error;
        })
    );
  }

  getEarningsForDiffMonths(
    userId: string,
    diff: number
  ): Observable<Earnings[]> {
    return from(
      axios
        .get<Earnings[]>(`${this.earningsUrl}/${diff}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => {
          return error;
        })
    );
  }

  getEarningsForThreeMonths(userId: string): Observable<Earnings[]> {
    return from(
      axios
        .get<Earnings[]>(`${this.earningsUrl}/3/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => {
          return error;
        })
    );
  }
  getEarningsForSixMonth(userId: string): Observable<Earnings[]> {
    return from(
      axios
        .get<Earnings[]>(`${this.earningsUrl}/6/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }

  deleteEarningsData(userId: string, month: any): Observable<null> {
    return from(
      axios.delete<void>(`${this.requestUrl}/month/${userId}`).then(() => null)
    );
  }

  // budget
  private budgetUrl = 'http://localhost:3000/budget/items';

  insertAllocatedBudgetItem(
    userId: string,
    item: any
  ): Observable<AllocatedBudget[]> {
    return from(
      axios
        .post<AllocatedBudget[]>(`${this.budgetUrl}/${userId}`, item)
        .then((resp) => {
          resp.data;
        })
        .catch((error) => error)
    );
  }

  updateAllocatedBudgetItem(
    userId: string,
    itemName: any
  ): Observable<AllocatedBudget[]> {
    return from(
      axios
        .put<AllocatedBudget[]>(
          `${this.budgetUrl}/itemName/${userId}`,
          itemName
        )
        .then((resp) => resp.data)
    );
  }

  getAllocatedBudgetData(userId: string): Observable<AllocatedBudget[]> {
    return from(
      axios
        .get<AllocatedBudget[]>(`${this.budgetUrl}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getAllocatedBudgetDataForMonths(
    userId: string,
    diff: number
  ): Observable<AllocatedBudget[]> {
    return from(
      axios
        .get<AllocatedBudget[]>(`${this.budgetUrl}/month/${diff}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getAllocatedBudgetDataForThreeMonths(
    userId: string
  ): Observable<AllocatedBudget[]> {
    return from(
      axios
        .get<AllocatedBudget[]>(`${this.budgetUrl}/amount/3/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getBAllocatedBudgetDataForSixMonths(
    userId: string
  ): Observable<AllocatedBudget[]> {
    return from(
      axios
        .get<AllocatedBudget[]>(`${this.budgetUrl}/amount/6/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }

  getCurrentMonthAllocatedBudget(userId: string): Observable<any[]> {
    return from(
      axios
        .get<number>(`${this.budgetUrl}/budget/total/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getAllocatedBudgetByItemName(
    userId: string,
    itemName: any
  ): Observable<AllocatedBudget[]> {
    return from(
      axios
        .get<AllocatedBudget[]>(`${this.budgetUrl}/${itemName}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  deleteAllocatedBudgetItem(userId: string, itemName: any): Observable<null> {
    return from(
      axios
        .delete<void>(`${this.budgetUrl}/itemName/${userId}`)
        .then(() => null)
    );
  }

  // expenditure
  private requestUrl = 'http://localhost:3000/expenditure/items';
  insertExpenditureItem(userId: string, item: any): Observable<Expenditure[]> {
    console.log('item in data.service.ts: ' + item);
    console.log('user id: ' + userId);
    return from(
      axios
        .post<Expenditure[]>(`${this.requestUrl}/${userId}`, item)
        .then((resp) => {
          resp.data;
          console.log('resp data from data.service.ts: ' + resp.data);
        })
        .catch((error) => error)
    );
  }

  updateExpenditureItem(
    userId: string,
    itemName: any
  ): Observable<Expenditure[]> {
    return from(
      axios
        .put<Expenditure[]>(`${this.requestUrl}/itemName/${userId}`, itemName)
        .then((resp) => resp.data)
    );
  }
  getExpenditureData(userId: string): Observable<Expenditure[]> {
    return from(
      axios
        .get<Expenditure[]>(`${this.requestUrl}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getExpenditureDataForDiffMonths(
    userId: string,
    diff: number
  ): Observable<Expenditure[]> {
    return from(
      axios
        .get<Expenditure[]>(`${this.requestUrl}/month/${diff}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getExpenditureDataForThreeMonths(userId: string): Observable<Expenditure[]> {
    return from(
      axios
        .get<Expenditure[]>(`${this.requestUrl}/amount/3/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getExpenditureDataForSixMonths(userId: string): Observable<Expenditure[]> {
    return from(
      axios
        .get<Expenditure[]>(`${this.requestUrl}/amount/6/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }

  getCurrentMonthExpenditure(userId: string): Observable<any[]> {
    return from(
      axios
        .get<number>(`${this.requestUrl}/expenditure/total/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  getExpenditureByItemName(
    userId: string,
    itemName: any
  ): Observable<Expenditure[]> {
    return from(
      axios
        .get<Expenditure[]>(`${this.requestUrl}/${itemName}/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }

  getCurrentMonthAmountByExpenditure(userId: string): Observable<any[]> {
    return from(
      axios
        .get<any[]>(`${this.requestUrl}/category/total/${userId}`)
        .then((resp) => resp.data)
        .catch((error) => error)
    );
  }
  deleteExpenditureItem(userId: string, itemName: any): Observable<null> {
    return from(
      axios
        .delete<void>(`${this.requestUrl}/itemName/${userId}`)
        .then(() => null)
    );
  }
}
