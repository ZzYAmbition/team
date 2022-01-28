Component({
	properties: {
		showModal: {
			type: Boolean,
			value: false
    },
    title: {
      type: String,
      value: '新建分类'
    }
	},
	data: {
		newTagName: '',
		updateTagName: ''
	},
	methods: {
		cancel: function () {
			this.triggerEvent('cancel', 'cancel');
		},
		confirm: function () {
			let newTagName = this.data.newTagName;
			this.triggerEvent('confirm', {
				"newTagName": newTagName
			});
		},
		getNewTag: function (e) {
			this.setData({
				newTagName: e.detail.value
			})
		},
	}
})
