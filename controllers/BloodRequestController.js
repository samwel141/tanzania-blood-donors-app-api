const BloodRequest = require('../models/BloodRequests');
const BloodCenter = require('../models/BloodCenter')

// Function to post blood requests (multiple requests allowed)
const postRequests = async (req, res) => {
    try {
        const requests = req.body;
        // if (!Array.isArray(requests)) {
        //     return res.status(400).json({ message: 'Requests should be an array' });
        // }

        const createdRequests = await BloodRequest.insertMany(requests);
        return res.status(201).json({ message: 'Requests added successfully', data: createdRequests });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

// Function to get all blood requests
// const getAllRequests = async (req, res) => {
//     try {
//         const requests = await BloodRequest.find();
//         const totalRequests = requests.length;

//         const formattedRequests = requests.map(request => {
//             return {
//                 _id: request._id,
//                 center_id: request.center_id,
//                 basic_info: request.basic_info,
//                 whole_blood: request.whole_blood,
//                 prc: request.prc,
//                 ffp: request.ffp,
//                 plt: request.plt,
//                 createdAt: request.createdAt,
//                 updatedAt: request.updatedAt,
//                 __v: request.__v
//             };
//         });

//         res.status(200).json({ total: totalRequests, data: formattedRequests });
//         } catch (err) {
//         res.status(500).json({ message: err.message });
//     }

// };


const getAllRequests = async (req, res) => {
    try {
        // Retrieve all blood requests
        const requests = await BloodRequest.find().lean();

        // Retrieve all centers
        const centers = await BloodCenter.find().lean();

        // Create a map of center_id to center_name for quick lookup
        const centerMap = centers.reduce((map, center) => {
            map[center.center_id] = center.center_name;
            return map;
        }, {});

        // Format the requests and include center_name
        const formattedRequests = requests.map(request => {
            return {
                _id: request._id,
                center_id: request.center_id,
                center_name: centerMap[request.center_id], 
                basic_info: request.basic_info,
                whole_blood: request.whole_blood,
                prc: request.prc,
                ffp: request.ffp,
                plt: request.plt,
                createdAt: request.createdAt,
                updatedAt: request.updatedAt,
                __v: request.__v
            };
        });

        const totalRequests = requests.length;
        res.status(200).json({ total: totalRequests, data: formattedRequests });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Function to get a blood request by ID
const getById = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await BloodRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        return res.status(200).json({ data: request });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

// Function to get blood requests by center ID
const getByCenterId = async (req, res) => {
    try {
        const centerId = req.params.center_id;
        const requests = await BloodRequest.find({ center_id: centerId });
        return res.status(200).json({ data: requests });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = {
    postRequests,
    getAllRequests,
    getById,
    getByCenterId
};
