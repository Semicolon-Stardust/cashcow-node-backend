import express from 'express'

import { 
    addMemberToFamily,
    createFamilyGroup,
    getUserFamilyGroups
} from '../controllers/familyGroupController.js';
import { isUserAuthenticated } from '../middleware/auth.js';

const familyGroupRouter = express.Router();


familyGroupRouter.route('/new').post(isUserAuthenticated, createFamilyGroup);
familyGroupRouter.route('/me').get(isUserAuthenticated, getUserFamilyGroups);
familyGroupRouter.route('/add/:id').put(isUserAuthenticated, addMemberToFamily);


export default familyGroupRouter;