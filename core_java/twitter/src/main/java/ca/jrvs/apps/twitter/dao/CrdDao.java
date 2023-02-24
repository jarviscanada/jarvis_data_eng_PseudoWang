package ca.jrvs.apps.twitter.dao;

import ca.jrvs.apps.twitter.util.TwitterRuntimeException;

public interface CrdDao<T, K> {

  /**
   * Create an entity(Tweet) to the underlying storage
   * @param entity entity that to be created
   * @return created entity
   * @throws TwitterRuntimeException
   */
  T create(T entity) throws TwitterRuntimeException;

  /**
   * Find an entity(Tweet) by its id
   * @param id entity id
   * @return Tweet entity
   * @throws TwitterRuntimeException
   */
  T findById(K id) throws TwitterRuntimeException;

  /**
   * Delete an entity(Tweet) by its ID
   * @param id of the entity to be deleted
   * @return deleted entity
   * @throws TwitterRuntimeException
   */
  T deleteById(K id) throws TwitterRuntimeException;
}