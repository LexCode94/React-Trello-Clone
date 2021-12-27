import { useState } from 'react';
import { Icon, Card, Button } from '@mui/material';
import TextArea from 'react-textarea-autosize';
import { useDispatch } from 'react-redux';
import { addList } from '../actions/listActions';
import { addCard } from '../actions/cardsActions';



const TrelloActionButton = ({list, listID}) => {
    const [formOpen, setFormOpen] = useState(false)
    const [text, setText] = useState("")
    const dispatch = useDispatch();


    const handleAddList = () => {
        if(text) {
            dispatch(addList(text))
        }

        return
    }

    const handleAddCard = () => {
        if(text){
            dispatch(addCard(listID, text))
            console.log("listID: ", listID)
        }

        return
    }

    const renderAddButton = () => {

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0, 0, 0, .15)" : "inherit"


        return(
            <div 
            onClick={() => setFormOpen(true)}
            style={{
                ...styles.openForButtonGroup,
                opacity: buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonTextBackground
            }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        ) 
    }

    const renderForm = () => {

        const placeholder = list ? "Enter list title..." : "Enter a title for this card..."
        const buttonTitle = list ? "Add list" : "Add card"

        return (
        <div>
            <Card style={{
                overflow: "visible",
                minHeight: 80,
                minWidth: 272,
                padding: "6px 8px 2px"
            }}>
                <TextArea 
                placeholder={placeholder} 
                autoFocus onBlur={() => setFormOpen(false)} 
                onChange={e => setText(e.target.value)}
                style={{
                    resize: "none",
                    width: "100%",
                    outline: "none",
                    border: "none"
                }} />
            </Card>
            <div style={styles.formButtonGroup}>
                <Button 
                onMouseDown={list ? handleAddList : handleAddCard}
                variant="contained" 
                style={{color: "white", backgroundColor: "#5aac44"}} 
                >{buttonTitle}
                </Button>
                <Icon style={{marginLeft: 8, cursor: "pointer"}}>close</Icon>
            </div>
        </div>
        )
    }

    return formOpen ? renderForm() : renderAddButton();


}

const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
}

export default TrelloActionButton;