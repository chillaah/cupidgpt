const AWS = require('aws-sdk');

const isTestEnv = process.env.NODE_ENV === 'test'; // Add a flag for test mode

const mturk = new AWS.MTurk({
    endpoint: 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'
});

async function getMTurkResults(hitId) {
    if (isTestEnv) {
        // Mock data for testing
        return [
            { assignmentId: 'mockAssignment1', answer: '<Answer><Question>Q1</Question><FreeText>A1</FreeText></Answer>' },
            { assignmentId: 'mockAssignment2', answer: '<Answer><Question>Q2</Question><FreeText>A2</FreeText></Answer>' }
        ];
    }

    try {
        const response = await mturk.listAssignmentsForHIT({
            HITId: hitId,
            AssignmentStatuses: ['Submitted', 'Approved'],
            MaxResults: 10
        }).promise();
        return response.Assignments.map(assignment => ({
            assignmentId: assignment.AssignmentId,
            answer: assignment.Answer
        }));
    } catch (error) {
        console.error('Error fetching MTurk results:', error);
        throw error;
    }
}

module.exports = { getMTurkResults };


// const AWS = require('aws-sdk');
// AWS.config.update({ region: 'us-east-1' });

// const mturk = new AWS.MTurk({ endpoint: 'https://mturk-requester-sandbox.us-east-1.amazonaws.com' });

// async function getMTurkResults(hitId) {
//     try {
//         const response = await mturk.listAssignmentsForHIT({
//             HITId: hitId,
//             AssignmentStatuses: ['Submitted', 'Approved'],
//             MaxResults: 10
//         }).promise();
//         return response.Assignments.map(assignment => ({
//             assignmentId: assignment.AssignmentId,
//             answer: assignment.Answer
//         }));
//     } catch (error) {
//         console.error('Error fetching MTurk results:', error);
//         throw error;
//     }
// }

// module.exports = { getMTurkResults };
