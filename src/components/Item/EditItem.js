import React, { useState } from 'react'
import { connect } from 'react-redux'
import Errors from '../Layout/Errors'
import { editItem, deleteItem } from '../../actions/items'
import { editItemClose } from '../../actions/isOpen'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

function EditItem(props) {
    const selectedStore = props.stores.filter(store => store.id === props.storeId)
    const selectedItem = props.items.filter(item => item.id === props.itemId)

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            margin: 'auto',
            color: theme.palette.text.secondary,
        },
        header: {
            padding: theme.spacing(1),
            margin: 'auto',
            textAlign: 'center',
            color: `${selectedStore[0].color}`,
            fontWeight: 'bold',
            opacity: "90%"
        },
        form: {
            margin: 'auto',
            width: '95%',
        },
        submit: {
            margin: theme.spacing(5, 0, 2),
        },
    }))

    const classes = useStyles()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const item = {
            name: name,
            price: parseFloat(price).toFixed(2),
            quantity: parseInt(quantity),
            userId: props.user.id,
            storeId: props.storeId,
            itemId: props.itemId
        }

        props.editItem(item)
        setName("")
        setPrice("")
        setQuantity("")
    }

    const handleDelete = (id) => {
        props.deleteItem(id)
        props.editItemClose()
    }

    function itemFormat(words) {
        return words
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    if (props.errors) {
        return (
            <Errors />
        )
    } else {
        return (
            <Grid container className={classes.root}>
                <Typography className={classes.header}>
                    Edit {itemFormat(selectedItem[0].name)} From {itemFormat(selectedStore[0].name)}
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={e => handleSubmit(e)}
                >
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            id="name"
                            label={selectedItem[0].name}
                            name="name"
                            autoComplete="name"
                            onChange={handleName}
                            value={name}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            type="number"
                            id="quantity"
                            label={selectedItem[0].quantity}
                            name="quantity"
                            autoComplete="quantity"
                            onChange={handleQuantity}
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            type="number"
                            id="price"
                            label={selectedItem[0].price}
                            name="price"
                            autoComplete="price"
                            onChange={handlePrice}
                            value={price}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Edit Item
                    </Button>
                    <Button color="primary">
                        <DeleteForeverIcon fontSize="large" onClick={() => { if (window.confirm(`Are you sure you wish to delete ${selectedItem[0].name}?`)) handleDelete(selectedItem[0].id) }} />
                    </Button>
                </form>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    storeId: state.stores.storeId,
    errors: state.errors.errors,
    stores: state.stores.stores,
    items: state.items.items,
    itemId: state.items.itemId
})

export default connect(mapStateToProps, { editItem, deleteItem, editItemClose })(EditItem)