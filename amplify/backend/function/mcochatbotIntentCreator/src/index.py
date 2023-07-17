import boto3
import json

client = boto3.client('lexv2-models')

def remove_elements(bot_id, bot_version, locale_id, intent_response, slot_type_response, slot_response):
	"""
	Function to remove the intent, slot_type and slot_service
	"""
	print("removing slot type")
	slot_type = client.delete_slot_type(
	    slotTypeId=slot_type_response["slotTypeId"],
	    botId=bot_id,
	    botVersion=bot_version,
	    localeId=locale_id,
	    skipResourceInUseCheck=True
	)
	print("removing slot")
	slot = client.delete_slot(
	    slotId=slot_response["slotId"],
	    botId=bot_id,
	    botVersion=bot_version,
	    localeId=locale_id,
	    intentId=intent_response["intentId"]
	)
	print("removing intent")
	intent = client.delete_intent(
	    intentId=intent_response["intentId"],
	    botId=bot_id,
	    botVersion=bot_version,
	    localeId=locale_id
	)
	
	return None
	

def lambda_handler(event, context):
	service = f"{event['intent']}_service"

	# ------------------------------ Create intent ------------------------------
	intent_template = {
		"description": f"Intent related to {event['intent']} queries",
		"dialogCodeHook": {
			"enabled": True  # Allows calling lexHelperFunction from dialogCodeHook
		},
		"fulfillmentCodeHook": {
			"active": True, # Allows fulfillment to run
			"enabled": True,  # Alows calling lexHelperFunction from dialogCodeHook
			"postFulfillmentStatusSpecification": { 
				"failureResponse": { 
					"messageGroups": [ 
						{ 
							"message": { 
								"plainTextMessage": { 
									"value": "Something went wrong, try again please."
								},
							}
						}
					]
				}
			}
		},
		"intentName": event["intent"],
		"sampleUtterances": [ 
			{ 
				"utterance": "I currently have {quantifier} {%s}" % service
			},
			{ 
				"utterance": "I run {%s}" % service
			},
			{ 
				"utterance": "I currently manage {quantifier} {%s}" % service
			},
			{ 
				"utterance": "I run {%s}  on {quantifier} servers" % service
			},
			{ 
				"utterance": "{quantifier} {%s}" % service
			},
			{ 
				"utterance": "I manage {quantifier} {%s} . {action} them?" % service
			},
			{ 
				"utterance": "I have {%s} . {action} them?" % service
			},
			{ 
				"utterance": "I currently run {quantifier} {%s} . {action} ?" % service
			},
			{ 
				"utterance": "I manage {%s} on {quantifier} servers. {action} ?" % service
			},
			{ 
				"utterance": "What is the best way to {action} my {%s}" % service
			},
			{ 
				"utterance": "{action} on my {%s} ?" % service
			},
			{ 
				"utterance": "{%s}" % service
			},
			{ 
				"utterance": "Hello I currently run {quantifier} {%s} , {action} them?" % service
			},
			{ 
				"utterance": "{action} my {%s} ?" % service
			},
			{ 
				"utterance": "okay, then I have {%s}" % service
			}
		]
	}

	created_intent = client.create_intent(intentName = event["intent"],
	                                      botId = "9LMWBBNMCK",
	                                      botVersion = "DRAFT",
	                                      localeId = "en_US",
	                                      description = intent_template["description"],
	                                      sampleUtterances = intent_template["sampleUtterances"],
	                                      dialogCodeHook = intent_template["dialogCodeHook"],
	                                      fulfillmentCodeHook = intent_template["fulfillmentCodeHook"]
	)

	# ------------------------------ Create slot type ------------------------------
	# Sample values for slot type -> MUST BE HARDCODED FOR EACH INTENT
	try:
		sample_values = event["sampleValues"]
	except KeyError:
		sample_values = [ # Sample values for containers
			"Accelerate innovation",
			"Modernize workloads",
			"Work with containers",
			"Use containers",
			"Containers",
			"rearchitect apps",
			"from sql server to amazon aurora",
			"sql to aurora",
			"modernize sql",
			"replatform .net",
			"replatform dotnet",
			"replatform windows",
			"change windows",
			"replatfrom to Linux",
			"avoid virtual machines",
			"maximize application placement",
			"improve resource utilization",
			"moving windows to containers",
			"windows to containers",
			"implementing containers",
			"ECS",
			"Fargate",
			"Kubernetes",
			"Kubercost",
			"App2Container",
			"Migrating and modernizing java",
			"Migrating and modernizing .net"
		] 

	slot_type_values = []
	for value in sample_values:
		sample = { 
			"sampleValue": { 
				"value": value
			}
		}
		slot_type_values.append(sample)

	slot_type_template = {
		"parentSlotTypeSignature": "AMAZON.AlphaNumeric",
		"slotTypeName": f"{event['intent']}_type",
		"slotTypeValues": slot_type_values,
		"valueSelectionSetting": { 
			"resolutionStrategy": "OriginalValue"
		}
	}

	created_slot_type = client.create_slot_type(slotTypeName = slot_type_template["slotTypeName"],
												botId = "9LMWBBNMCK",
												botVersion = "DRAFT",
												localeId = "en_US",
												slotTypeValues = slot_type_values,
												valueSelectionSetting = slot_type_template["valueSelectionSetting"],							
	)

	# ------------------------------ Create slot ------------------------------

	service_slot_template = {
		"obfuscationSetting": { 
			"obfuscationSettingType": "DefaultObfuscation"
		},
		"slotName": f"{event['intent']}_service",
		"slotTypeId": created_slot_type["slotTypeId"],
		"valueElicitationSetting": {
			"promptSpecification":{
				"allowInterrupt": True,
				"maxRetries": 4,
				"messageGroups": [
					{
						"message": {
							"plainTextMessage": { 
								"value": "Okay, what services do you have?"
							}
						}
					}
				]
			},
			"slotConstraint": "Required"
		}
	}

	# Action slot
	sample_values = [
		"How can I minimize my costs",
		"How can I optimize my expenses",
		"Minimize my expenses",
		"Optimize my costs",
		"How can I maximize my benefits?",
		"Maximize my benefits",
		"I want to minimize my expenses. How could i do it?",
		"I want to optimize my costs. How could i do it?"
	] 

	action_values = []
	for value in sample_values:
		sample = { 
            "utterance": value
		}
		action_values.append(sample)

	action_slot_template = {
		"obfuscationSetting": { 
			"obfuscationSettingType": "DefaultObfuscation"
		},
		"slotName": "action",
		"slotTypeId": "HSIXDO8LLI", # action_type Id
		"valueElicitationSetting": {
			"slotConstraint": "Optional",
			"sampleUtterances": action_values,
		}
	}

	# Quantifier slot
	sample_values = [
		"ten",
		"two",
		"nine",
		"one hundred",
		"27",
		"50",
		"several",
		"some",
		"different"
	] 

	quantifier_values = []
	for value in sample_values:
		sample = { 
            "utterance": value
		}
		quantifier_values.append(sample)

	quantifier_slot_template = {
		"obfuscationSetting": { 
			"obfuscationSettingType": "DefaultObfuscation"
		},
		"slotName": "quantifier",
		"slotTypeId": "DBDPJ3JHQ2", # quantifier_type Id
		"valueElicitationSetting": {
			"slotConstraint": "Optional",
			"sampleUtterances": quantifier_values,
		}
	}

	# Creating service slot
	created_slot_service = client.create_slot( slotName = service_slot_template["slotName"],
									    botId = "9LMWBBNMCK",
									    botVersion = "DRAFT",
									    intentId = created_intent["intentId"],
									    localeId = "en_US",
									   	obfuscationSetting = service_slot_template["obfuscationSetting"],
									   	slotTypeId = service_slot_template["slotTypeId"],
									   	valueElicitationSetting = service_slot_template["valueElicitationSetting"]
	)
	# Creating action slot
	created_slot_action = client.create_slot( slotName = action_slot_template["slotName"],
									    botId = "9LMWBBNMCK",
									    botVersion = "DRAFT",
									    intentId = created_intent["intentId"],
									    localeId = "en_US",
									   	obfuscationSetting = action_slot_template["obfuscationSetting"],
									   	slotTypeId = action_slot_template["slotTypeId"],
									   	valueElicitationSetting = action_slot_template["valueElicitationSetting"]
	)
	# Creating quantifer slot
	created_slot_quantifier = client.create_slot( slotName = quantifier_slot_template["slotName"],
									    botId = "9LMWBBNMCK",
									    botVersion = "DRAFT",
									    intentId = created_intent["intentId"],
									    localeId = "en_US",
									   	obfuscationSetting = quantifier_slot_template["obfuscationSetting"],
									   	slotTypeId = quantifier_slot_template["slotTypeId"],
									   	valueElicitationSetting = quantifier_slot_template["valueElicitationSetting"]
	)
	
	# Defining slot priorities
	slot_priorities = [ 
      { 
         "priority": 1,
         "slotId": created_slot_service["slotId"]
      },
      { 
         "priority": 2,
         "slotId": created_slot_action["slotId"]
      },
      { 
         "priority": 3,
         "slotId": created_slot_quantifier["slotId"]
      }
    ]
	
	update_response = client.update_intent(botId = "9LMWBBNMCK", 
					                       botVersion = "DRAFT",
					                       intentId = created_intent["intentId"],
					                       localeId = "en_US",
					                       slotPriorities = slot_priorities
	)
	
	# ------------------------------ Remove created elements ------------------------------
	
	# remove_elements(bot_id="9LMWBBNMCK",
	# 		        bot_version="DRAFT",
	# 		        locale_id="en_US",
	# 		        intent_response=created_intent, 
	# 		        slot_type_response=created_slot_type, 
	# 		        slot_response=created_slot_service
	# )

	# ------------------------------ Building the bot ------------------------------
	response = client.build_bot_locale(
	    botId="9LMWBBNMCK",
	    botVersion="DRAFT",
	    localeId="en_US"
	)
	
	# ------------------------------ Generating lambda response ------------------------------
	response = {
		"intentCreationResponse":created_intent,
		"slotTypeCreationResponse":created_slot_type,
		"slotCreationResponse":created_slot_service,
	}
	
	return json.dumps(response, default=str)
