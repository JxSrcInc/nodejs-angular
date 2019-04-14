class Config {
	constructor() {
		this.jxSrcCategories = ['Receivable',
			'Tax preparation',
			'Computer service',
			'Insurance',
			'Office expanse',
			'Postage',
			'Telephone',
			'Travel expense',
			'Uniforms',
			'Meals ','100%)',
			'Meals ','50%)',
			'Unemployment',
			'HSA contribution',
			'HSA fee',
			'Property tax',
			'Gift card'
		];
		this.rentalCategories = ['Rental Income',
			'Depreciation',
			'Vehical Expenses',
			'Insurance',
			'Management Fees',
			'Repairs',
			'Real Estate Taxes',
			'Other Taxes',
			'Utilities',
			'Mortgage Interest'
		];
		this.homeCategories = ['Mortgage Interest',
			'Property Taxes',
			'Insurance',
			'Utility'
		]
		this.nnzCategories = ['Legal ane Professional Fees',
		'Other Expenses'
		]
		this.accountMap = [
            {id:'jxsrc',account:'AccountJxsrc'},
            {id:'nnz',account:'AccountNNZ'},
            {id:'1013',account:'AccountRental',args:2},
            {id:'5376',account:'AccountRental',args:1},
            {id:'9076',account:'AccountRental',args:2},
            {id:'9298',account:'AccountRental',args:2},
            {id:'9374',account:'AccountRental',args:2},
            {id:'9860',account:'AccountNewRental',args:2},
            {id:'9899',account:'AccountRental',args:2},
            {id:'13300',account:'AccountHome'}

		]
	}
}

module.exports = Config;