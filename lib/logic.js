/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

 /**
  * Subscribe to an insurance
  * @param {org.magma.max.InsuranceTransaction} insuranceTransaction - the InsuranceTransaction transaction
  * @transaction
  */
 async function insuranceTransaction(insuranceTransaction) {

 }

 /**
  * Borrow for the order
  * @param {org.magma.max.LoanTransaction} loanTransaction - the LoanTransaction transaction
  * @transaction
  */
 async function loanTransaction(loanTransaction) {

 }

 /**
  * Order a car
  * @param {org.magma.max.OrderTransaction} orderTransaction - the OrderTransaction transaction
  * @transaction
  */
 async function orderTransaction(orderTransaction) {

 }

 /**
  * Initialize some test assets and participants useful for running a demo.
  * @param {org.magma.max.SetupDemo} setupDemo - the SetupDemo transaction
  * @transaction
  */
 async function setupDemo(setupDemo) {
     const factory = getFactory();
     const NS = 'org.auto';

     /* PARTICIPANTS */
     const client = factory.newResource(NS, 'Client', 'client@email.com');
     client.firstName = 'Maxime';
     client.lastName =  'Gfr';
     client.address = 'Place de Clichy, 75017 - Paris, France';

     const insurer = factory.newResource(NS, 'Insurer', 'insurer@email.com');
     insurer.name = 'MMA';

     const bank = factory.newResource(NS, 'Bank', 'bank@email.com');
     bank.name = 'Credit Agricole';

     const manufacturer = factory.newResource(NS, 'Manufacturer', 'manufacturer@email.com');
     manufacturer.name = 'Peugeot';

     /* ASSETS */
     const vehicle = factory.newResource(NS, 'Vehicle', 'VEHICLE_001');
     vehicle.status = 'NOT_SOLD';
     vehicle.type = '5008';
     vehicle.price = '35000';
     vehicle.manufacturer = factory.newRelationship(NS, 'Manufacturer', 'manufacturer@email.com');

     const loan = factory.newResource(NS, 'Loan', 'LOAN_001');
     loan.monthlyPrice = '1000';
     loan.monthDuration = '24';
     loan.totalAmount = '26000';
     loan.accepted = false;
     loan.bank = factory.newRelationship(NS, 'Bank', 'bank@email.com');

     const insurance = factory.newResource(NS, 'Loan', 'LOAN_001');
     insurance.monthlyPrice = '100';
     insurance.monthDuration = '12';
     insurance.totalAmount = '1250';
     insurance.type = 'Tous risques';
     insurance.accepted = false;
     insurance.insurer = factory.newRelationship(NS, 'Insurer', 'insurer@email.com');

     /* ADD ASSETS and PARTICIPANTS */
     const clientRegistry = await getParticipantRegistry(NS + '.Client');
     await clientRegistry.addAll([client]);

     const insurerRegistry = await getParticipantRegistry(NS + '.Insurer');
     await insurerRegistry.addAll([insurer]);

     const bankRegistry = await getParticipantRegistry(NS + '.Bank');
     await bankRegistry.addAll([bank]);

     const manufacturerRegistry = await getParticipantRegistry(NS + '.Manufacturer');
     await manufacturerRegistry.addAll([manufacturer]);

     const vehicleRegistry = await getAssetRegistry(NS + '.Vehicle');
     await vehicleRegistry.addAll([vehicle]);

     const loanRegistry = await getAssetRegistry(NS + '.Loan');
     await loanRegistry.addAll([loan]);

     const insuranceRegistry = await getAssetRegistry(NS + '.Insurance');
     await insuranceRegistry.addAll([insurance]);

 }
