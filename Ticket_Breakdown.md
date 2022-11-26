# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Task 1 - Create new table `Agent_External_Ids`

this table will have the following columns
| column      | data_type   | note                                                                                      |
| ----------- | ----------- | ----------------------------------------------------------------------------------------- |
| facility_id | int32       | this is foreign key referencing the Facilities table (match its datatype with Facilities) |
| agent_id    | int32       | this is foreign key referencing the Agents table (match its datatype with Agents)         |
| external_id | varchar(10) | would finalize the length after consultation with the largest facilities on platform      |

Note: (facility_id, agent_id) need to be unique, if needed we can also capture created_at, updated_at to track when an external_id. We can index facility_id as most of the times while reading this table will be queried using facility_id

Acceptance Criteria:
We have a table with the above schema

Time/effort estimates:
Low-effort

### Task 2 - Add new function `addOrUpdateExternalAgentId`

This new function will take facility_id, agent_id and external_id as input.
It will create a new mapping if there is no mapping present for facility_id, agent_id. Else it will update the existing mapping
Appropriate access control needs to be in place to ensure Facility A doesn't update the external agent id for Facility B

Acceptance Criteria:
We have a new function which can be used by facility managers to add or update the external_id for agents working with them

Time/effort estimates:
Medium-effort


### Task 3 - Add an optional param `with_agent_external_id` to `getShiftsByFacility`

this new param will be false by default, if passed as true we will query the agent's `external_id` while selecting agent details
It can be achieved using join (Agents left join Agent_External_Ids).

Acceptance Criteria:
`getShiftsByFacility` is able to accurately retrieve `external_id` for Shifts with Agents for whom an `external_id` has been setup by the facility
No additional query should be called if `with_agent_external_id` has not been passed or is false

Time/effort estimates:
Medium-effort

### Task 4 - Updates to `generateReport` to represent `external_id`

When `external_id` is present in Agents metadata in the passed Shifts data, represent it appropriately as a separate field in the PDF.
We should not replace the current `id` of Agents with `external_id` as there can be cases where some users might not have an `external_id`, for these cases we won't like to conflict with their `id`

Acceptance Criteria:
`generateReport` represents `external_id` for Shifts where it is present
It should be easy to differentiate between Agent's `id` and `external_id`

Time/effort estimates:
Medium-effort
