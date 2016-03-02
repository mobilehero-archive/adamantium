/**
 * @class Alloy.Collections
 * Class to access or create collections.
 *
 * Collections can either be created in markup or programmatically in the controller.
 *
 * To create collections in markup use a `<Collection/>` element. For 
 * more information see [Collection Element](#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-CollectionElement)
 * in the Alloy developer guide.
 *
 * In the controller code:
 *
 *    - To create a local instance, use the Alloy.createCollection method.
 *    - To create a global singleton instance, use the Alloy.Collections.instance method.
 *
 * Previously created collections through markup or using the `{@link #instance instance()}` method 
 * are directly accessed as properties of the `Alloy.Collections` namespace,
 * using either the name of the model JavaScript file for singletons
 * or the ID name for local instances.
 */

/**
 * @method instance
 * Creates a singleton instance of a Collection based on the given model, or
 * returns an existing instance if one has already been created.
 * @param {String} name the name of the base model for the collection
 * @return {Backbone.Collection} An Alloy Collection object singleton
 */
