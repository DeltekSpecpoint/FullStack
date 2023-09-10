using Contacts.Core.Models;

namespace Contacts.Core.Repository
{
	public interface IRepository<TEntity> where TEntity : BaseEntity
	{
		IQueryable<TEntity> Query();
		//void Save(TEntity entity);
		void Add(TEntity entity);
		void AddRange(IEnumerable<TEntity> entities);
		void Delete(TEntity entity);
		void Update(TEntity entity);
	}
}
