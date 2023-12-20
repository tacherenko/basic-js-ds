const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this._addNode(this.rootNode, data);
  }

  _addNode(node, data) {
    if (!node) {
      return new Node(data);
    }

    if (data === node.data) {
      return node;
    }

    if (data < node.data) {
      node.left = this._addNode(node.left, data);
    } else {
      node.right = this._addNode(node.right, data);
    }

    return node;
  }

  has(data) {
    return this._searchData(this.rootNode, data);
  }

  _searchData(node, data) {
    if (!node) {
      return false;
    }

    if (data === node.data) {
      return true;
    }

    return data < node.data
      ? this._searchData(node.left, data)
      : this._searchData(node.right, data);
  }

  find(data) {
    return this._findData(this.rootNode, data);
  }

  _findData(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      return node;
    }

    return data < node.data
      ? this._findData(node.left, data)
      : this._findData(node.right, data);
  }

  remove(data) {
    this.rootNode = this._removeData(this.rootNode, data);
  }

  _removeData(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeData(node.left, data);
    } else if (node.data < data) {
      node.right = this._removeData(node.right, data);
    } else {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      let minRightNode = this._findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this._removeData(node.right, minRightNode.data);
    }

    return node;
  }

  _findMinNode(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  min() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};