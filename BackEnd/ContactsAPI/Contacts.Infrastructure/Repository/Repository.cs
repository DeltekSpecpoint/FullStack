using Contacts.Core.Models;
using Contacts.Core.Repository;
using Contacts.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Infrastructure.Repository
{
	public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
	{
		private readonly ContactsContext _context;
		private readonly DbSet<TEntity> _dbSet;

		public Repository(ContactsContext context)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
			_dbSet = _context.Set<TEntity>();
		}

		public IQueryable<TEntity> Query()
		{
			return _dbSet;
		}

		public void Add(TEntity entity)
		{
			_dbSet.Add(entity);
		}

		public void AddRange(IEnumerable<TEntity> entities)
		{
			_dbSet.AddRange(entities);
		}

		public void Delete(TEntity entity)
		{
			_dbSet.Remove(entity);
		}

		public void Update(TEntity entity)
		{
			_dbSet.Update(entity);
		}
	}
}
