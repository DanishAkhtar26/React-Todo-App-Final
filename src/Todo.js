import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        id: ""
      },
      value: [],
      isEdit: false,
      editValue: "",
      editId: ""
    };
  }

  //function for input box
  handleChange = (e) => {
    this.setState(
      {
        name: {
          value: e.target.value,
          id: uuidv4()
        }
      },
      () => console.log(this.state.name.value)
    );
  };

  //submit function on value submit
  submit = (e) => {
    console.log("button");
    if (this.state.name.value === "") {
      alert("Please add something todo");
      return;
    } else {
      this.setState(
        {
          name: {
            value: e.target.value,
            id: uuidv4()
          }
        }
        //() => console.log(this.state.name.value)
      );
    }
    this.setState(
      {
        name: {
          value: ""
        },
        value: [...this.state.value, this.state.name]
      },
      () => console.log(this.state)
    );
  };

  //remove function to remove items from todo
  remove = (id) => {
    let value = this.state.value;
    const remove = value.filter((ele) => ele.id !== id);
    this.setState({
      value: remove
    });
  };

  //edit function to edit todo item
  edit = (value, id) => {
    this.setState(
      {
        isEdit: true,
        editValue: value,
        editId: id
      },
      () => console.log(id, value)
    );
  };

  //update function after edit to update item
  update = () => {
    let value = this.state.value;
    const item = value.filter((ele) =>
      ele.id === this.state.editId
        ? (ele.value = this.state.editValue)
        : ele.value
    );

    this.setState({ value: item, isEdit: false }, () => {
      console.log(this.state.value);
    });
  };

  render() {
    const { isEdit } = this.state;

    if (!isEdit) {
      return (
        <>
          <div>
            <input
              id="text-input"
              value={this.state.name.value}
              onChange={this.handleChange}
              placeholder="Write something todo..."
            />
            <button id="add" onClick={this.submit}>
              <strong>Submit</strong>
            </button>
          </div>
          <p></p>
          <div>
            {this.state.value &&
              this.state.value.map((ele, index) => (
                <div className="list-container" key={ele.id}>
                  <div id="text">{ele.value}</div>
                  <button
                    id="edit"
                    onClick={(e) => this.edit(ele.value, ele.id)}
                  >
                    <strong>Edit</strong>
                  </button>
                  <button id="remove" onClick={() => this.remove(ele.id)}>
                    <strong>Remove</strong>
                  </button>
                </div>
              ))}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <div className="editDiv">
            <span className="editBox">
              <strong>Edit Todo List</strong>
            </span>
          </div>
          <input
            id="update-input"
            value={this.state.editValue}
            onChange={(e) => {
              this.setState({ editValue: e.target.value });
            }}
          />
          <button id="update" onClick={this.update}>
            <strong>Update</strong>
          </button>
          <button
            id="cancel"
            onClick={() => {
              this.setState({ isEdit: false });
            }}
          >
            <strong>Cancel</strong>
          </button>
        </div>
      );
    }
  }
}
