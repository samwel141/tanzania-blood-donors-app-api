const BloodRequest = require('../models/BloodRequests');
const BloodCenter = require('../models/BloodCenter')

// Function to post blood requests (multiple requests allowed)
const postRequests = async (req, res) => {
    try {
        const requests = req.body;

        const createdRequests = await BloodRequest.insertMany(requests);
        return res.status(201).json({ message: 'Requests added successfully', data: createdRequests });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};

const getAllRequests = async (req, res) => {
    try {
        // Fetch all blood requests and blood centers
        const requests = await BloodRequest.find().lean();
        const centers = await BloodCenter.find().lean();

        const centerMap = centers.reduce((map, center) => {
            map[center._id.toString()] = center.name;  // Use toString() to ensure the keys are strings
            return map;
        }, {});

        const formattedRequests = requests.map(request => {
            const centerName = centerMap[request.center_id.toString()] || 'Unknown';  


            return {
                _id: request._id,
                center_id: request.center_id,
                center_name: centerName,
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

        // Send the response with total requests and formatted data
        const totalRequests = requests.length;
        res.status(200).json({ total: totalRequests, data: formattedRequests });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




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
