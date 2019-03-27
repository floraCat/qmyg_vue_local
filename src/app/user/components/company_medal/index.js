import './index.scss';

import Title 			from '~common/components/title';
import copyRight 	from '~common/components/copy_right';

export default {
	name: 'user_help',
  data () {
		return {
			active: ''
		};
  },
  components: {
    'app-title': Title,
    copyRight,
  },
  methods: {
		handleImgClick (index) {
			this.active = index;
		}
  }
};