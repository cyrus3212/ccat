module.exports = {
  "type": "object",
  "properties": {
    "employeePermissions": {
      type: "array",
      minItems: 2,
      maxItems: 7,
      uniqueItems: true,
      "items": {
        storeAccess: {
          type: "array",
          minItems: 1,
          maxItems: 3,
          uniqueItems: true,
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                faker: "random.uuid"
              },
              name: {
                type: "string",
                faker: "commerce.productName"
              },
            },
            required: ["id", "name"]
          }
        },
        workboookAccess: {
          type: "array",
          minItems: 1,
          maxItems: 5,
          uniqueItems: true,
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                faker: "random.uuid"
              },
              name: {
                type: "string",
                faker: "commerce.productName"
              },
            },
            required: ["id", "name"]
          }
        },
        "typeAccess": {
          "type": "number",
          "minimum": 1,
          "maximum": 5
        },
        "firstName": {
          "faker": "name.firstName"
        },
        "middleName": {
          "faker": "name.lastName"
        },
        "lastName": {
          "faker": "name.lastName"
        },
        "userEmail": {
          "type": "string",
          "faker": "internet.email"
        },
      },
      "required": ["storeAccess", "workboookAccess", "id", "firstName", "middleName", "lastName", "userEmail"]
    }, // End of object employeePermissions

    "setup": {
      type: "object",
      properties: {
        id: {
          type: "string",
          faker: "random.uuid"
        },
        code: {
          type: "string",
          faker: "commerce.productName"
        },
        firstSetup: {
          type: "string",
          faker: "commerce.productName"
        },
        label: {
          type: "string",
          faker: "commerce.productName"
        },
        "menus": {
          type: "array",
          minItems: 3,
          maxItems: 7,
          uniqueItems: true,
          "items": {
            "id": {
              "type": "number",
              "minimum": 1,
              "maximum": 10
            },
            "code": {
              type: "string",
              faker: "commerce.productName"
            },
            "name": {
              type: "string",
              faker: "commerce.productName"
            },
            "label": {
              type: "string",
              faker: "commerce.productName"
            },
            "tooltip": {
              type: "string",
              faker: "commerce.productName"
            },
            submenus: {
              type: "array",
              minItems: 4,
              maxItems: 7,
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    faker: "random.uuid"
                  },
                  code: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  name: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  label: {
                    type: "string",
                    faker: "commerce.productName"
                  }
                },
                required: ["id", "code", "name", "label"]
              }
            },
          },
          "required": ["submenus", "id", "name", "code", "label"]
        }
      },
      required: ["id", "code", "firstSetup", "label", "menus"]
    },

    "enterprises": {
      type: "object",
      properties: {
        isOk: {
          type: "string",
          faker: "random.uuid"
        },
        status: {
          type: "string",
          faker: "commerce.productName"
        },
        "data": {
          type: "array",
          minItems: 3,
          maxItems: 7,
          uniqueItems: true,
          "items": {
            "enterprise": {
              type: "object",
              properties: {
                enterpriseCode: {
                  type: "string",
                  faker: "random.uuid"
                },
                schemaId: {
                  type: "string",
                  faker: "commerce.productName"
                },
                description: {
                  type: "string",
                  faker: "random.uuid"
                },
                status: {
                  type: "string",
                  faker: "commerce.productName"
                },
                id: {
                  type: "string",
                  faker: "random.uuid"
                },
                validationResult: {
                  type: "array",
                  minItems: 1,
                  maxItems: 2,
                  uniqueItems: true,
                  items: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        faker: "random.uuid"
                      },
                      message: {
                        type: "string",
                        faker: "commerce.productName"
                      },
                    },
                    required: ["key", "message"]
                  }
                },
              },
              required: ["enterpriseCode", "schemaId", "description", "status", "id", "validationResult"]
            },
            stores: {
              type: "array",
              minItems: 4,
              maxItems: 7,
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    faker: "random.uuid"
                  },
                  enterpriseId: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  name: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  companyNumber: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  dtid: {
                    type: "string",
                    faker: "random.uuid"
                  },
                  status: {
                    "type": "number",
                    "minimum": 1,
                    "maximum": 10
                  },
                  statusText: {
                    type: "string",
                    pattern: "Completed|In-progress|Scraped Uploaded|Created"
                  },
                  validationResult: {
                    type: "array",
                    minItems: 1,
                    maxItems: 2,
                    uniqueItems: true,
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          faker: "random.uuid"
                        },
                        message: {
                          type: "string",
                          faker: "commerce.productName"
                        },
                      },
                      required: ["key", "message"]
                    }
                  }
                },
                required: ["id", "enterpriseId", "name", "companyNumber", "dtid", "status", "statusText", "validationResult"]
              }
            },
          },
          "required": ["stores", "enterprise"]
        }
      },
      required: ["isOk", "status", "data"]
    },

    "menus": {
      type: "array",
      minItems: 3,
      maxItems: 7,
      uniqueItems: true,
      "items": {
        "id": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "code": {
          type: "string",
          faker: "commerce.productName"
        },
        "name": {
          type: "string",
          faker: "commerce.productName"
        },
        "label": {
          type: "string",
          faker: "commerce.productName"
        },
        "tooltip": {
          type: "string",
          faker: "commerce.productName"
        },
        submenus: {
          type: "array",
          minItems: 4,
          maxItems: 7,
          uniqueItems: true,
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                faker: "random.uuid"
              },
              code: {
                type: "string",
                faker: "commerce.productName"
              },
              name: {
                type: "string",
                faker: "commerce.productName"
              },
              label: {
                type: "string",
                faker: "commerce.productName"
              }
            },
            required: ["id", "code", "name", "label"]
          }
        },
      },
      "required": ["submenus", "id", "name", "code", "label"]
    }, // End of object menus

    "enterprise": {
      type: "array",
      minItems: 3,
      maxItems: 5,
      uniqueItems: true,
      "items": {
        "id": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "code": {
          type: "string",
          faker: "random.uuid"
        },
        "name": {
          type: "string",
          faker: "commerce.productName"
        },
        "description": {
          type: "string",
          faker: "commerce.productName"
        },
        stores: {
          type: "array",
          minItems: 3,
          maxItems: 5,
          uniqueItems: true,
          items: {
            type: "object",
            properties: {
              "id": {
                "type": "number",
                "minimum": 1,
                "maximum": 10
              },
              "enterpriseId": {
                "type": "number",
                "minimum": 1,
                "maximum": 10
              },
              "dtid": {
                type: "string",
                faker: "random.uuid"
              },
              "code": {
                type: "string",
                faker: "random.uuid"
              },
              "description": {
                type: "string",
                faker: "commerce.productName"
              },
              "name": {
                type: "string",
                faker: "commerce.productName"
              },
              "companyNumber": {
                "type": "number",
                "minimum": 1,
                "maximum": 20
              },
              "status": {
                "type": "string",
                "pattern": "Done|In-progress|Pause"
              },
            },
            "required": ["id", "enterpriseId", "dtid", "code", "description", "name", "companyNumber", "status"]
          }
        },
      },
      "required": ["id", "code", "name", "description", "companies"]
    }, // End of object enterprise

    "stores": {
      type: "array",
      minItems: 3,
      maxItems: 5,
      uniqueItems: true,
      "items": {
        "id": {
          type: "string",
          faker: "random.uuid"
        },
        "enterpriseId": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "dtid": {
          type: "string",
          faker: "random.uuid"
        },
        "code": {
          type: "string",
          faker: "random.uuid"
        },
        "description": {
          type: "string",
          faker: "commerce.productName"
        },
        "companyNumber": {
          "type": "number",
          "minimum": 1,
          "maximum": 20
        },
        "status": {
          "type": "string",
          "pattern": "Done|In-progress|Pause"
        },
      },
      "required": ["id", "enterpriseId", "dtid", "code", "description", "companyNumber", "status"]
    }, // End of object stores

    "enterpriseDetail" : {
      type: "object",
      properties: {
        isOk: {
          type: "string",
          faker: "random.uuid"
        },
        status: {
          type: "string",
          faker: "commerce.productName"
        },
        "data": {
          type: "object",
          "properties": {
            "enterprise": {
              type: "object",
              properties: {
                enterpriseCode: {
                  type: "string",
                  faker: "random.uuid"
                },
                schemaId: {
                  type: "string",
                  faker: "commerce.productName"
                },
                description: {
                  type: "string",
                  faker: "random.uuid"
                },
                status: {
                  type: "string",
                  faker: "commerce.productName"
                },
                id: {
                  type: "string",
                  faker: "random.uuid"
                },
                validationResult: {
                  type: "array",
                  minItems: 1,
                  maxItems: 2,
                  uniqueItems: true,
                  items: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        faker: "random.uuid"
                      },
                      message: {
                        type: "string",
                        faker: "commerce.productName"
                      },
                    },
                    required: ["code", "message"]
                  }
                },
              },
              required: ["enterpriseCode", "schemaId", "description", "status", "id", "validationResult"]
            },
            stores: {
              type: "array",
              minItems: 4,
              maxItems: 7,
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    faker: "random.uuid"
                  },
                  enterpriseId: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  name: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  companyNumber: {
                    type: "string",
                    faker: "commerce.productName"
                  },
                  dtid: {
                    type: "string",
                    faker: "random.uuid"
                  },
                  status: {
                    "type": "number",
                    "minimum": 1,
                    "maximum": 10
                  },
                  statusText: {
                    type: "string",
                    pattern: "Completed|In-progress|Scraped Uploaded|Created"
                  },
                  validationResult: {
                    type: "array",
                    minItems: 1,
                    maxItems: 2,
                    uniqueItems: true,
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          faker: "random.uuid"
                        },
                        message: {
                          type: "string",
                          faker: "commerce.productName"
                        },
                      },
                      required: ["key", "message"]
                    }
                  }
                },
                "required": ["id", "enterpriseId", "dtid", "code", "description", "name", "companyNumber", "status", "statusText"]
              }
            },
          },
          "required": ["stores", "enterprise"]
        }
      },
      required: ["isOk", "status", "data"]
    }
    // end of enterprise detail
  },

  "required": ["employeePermissions", "menus", "enterprises", "enterpriseDetail", "stores"]
};
