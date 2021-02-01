const express = require('express');
const PanelController = require('../controllers/panel.controller')
const router = express.Router();

/**
 * @description get all companies
 */
router.get('/:companyId', PanelController.getPanels);


/**
 * @description update company
 */
router.put('/:panelId', PanelController.updatePanel);

/**
 * @description create company
 */
router.post('/', PanelController.createPanel);


/**
 * @description delete company
 */
router.delete('/:panelId', PanelController.deletePanel);

/**
 * @description change the password of the user
 */
// router.post('/changePassword/:userId', UserController.changePassword);


router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;