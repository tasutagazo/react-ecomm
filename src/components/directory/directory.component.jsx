import React from 'react'
import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import './directory.styles.scss'
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = ({ directory }) => (
  <div className="directory-menu">
  {
      directory.map(({id, ...otherSectionProps } ) => (
          <MenuItem key={id} {...otherSectionProps} />
      ))
  }
</div>
)

const mapStateToProps = createStructuredSelector({
  directory: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)
