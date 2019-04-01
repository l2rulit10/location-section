import React from 'react'
import Modal from 'react-modal'
import AccText from './AccText'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    height: '500px',
    width: '600px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Popup extends React.Component {
  constructor () {
    super()

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  render () {
    return (
      <div>
        <button onClick={this.openModal}>Documention</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <button onClick={this.closeModal}>&times;</button>
          <AccText />
        </Modal>
      </div>
    )
  }
}

export default Popup
