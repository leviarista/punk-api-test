import React from 'react'

const DetailModal = (props) => {
    return (
        props.visibleModal && (
            <>
                <div className="modal-overlay" onClick={() => props.handleCloseModal()}></div>
                <div className="detail-modal">
                    <img src={props.selectedItem.image_url} className="" alt="punk-api" />
                    <div className="modal-content">
                        <div className="close-button" onClick={() => props.handleCloseModal()}>×</div>
                        <h2>{props.selectedItem.name}</h2>
                        <i>{props.selectedItem.tag_line}</i>
                        <p>
                            <b>Volume: </b>{props.selectedItem.volume?.value + ' ' + props.selectedItem.volume?.unit} <br />
                            <b>Attenuation level:: </b>{props.selectedItem.attenuation_level} <br />
                            <b>pH:: </b>{props.selectedItem.ph} <br />
                        </p>
                        <p>
                            {props.selectedItem.description}
                        </p>
                    </div>
                </div>
            </>
        )
    )
}

export default DetailModal
